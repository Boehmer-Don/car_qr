from datetime import datetime, timedelta
import stripe
import sqlalchemy as sa


from app import models as m, db
from app.logger import log


def weekly_dealer_gift_box_invoices():
    today = datetime.now()
    log(
        log.INFO,
        "weekly dealer gift box invoices started [%s]",
        today.strftime("%Y-%m-%d %H:%M:%S"),
    )
    before_7_days = today - timedelta(days=7)

    dealers = db.session.scalars(
        sa.select(m.User).where(
            m.User.role == m.UsersRole.dealer, m.User.deleted.is_(False)
        )
    ).all()
    for dealer in dealers:
        gift_boxes = db.session.scalars(
            sa.select(m.GiftBox).where(
                before_7_days < m.GiftBox.created_at,
                m.GiftBox.created_at <= today,
                m.GiftBox.dealer_id == dealer.id,
            )
        ).all()

        cars = set(gift_box.sale_rep.label for gift_box in gift_boxes)

        total_price = sum(car.sale_report.total_boxes_price for car in cars)
        if total_price <= 0.5:
            log(log.ERROR, "Total price is to small for a invocies [%s]", dealer.email)
            continue

        if not dealer.stripe_customer_id:
            log(log.ERROR, "dealer [%s] has no stripe customer id", dealer.email)
            continue

        invoice = stripe.Invoice.create(
            customer=dealer.stripe_customer_id,
            collection_method="send_invoice",
            pending_invoice_items_behavior="exclude",
            days_until_due=7,
        )

        for car in cars:
            stripe.InvoiceItem.create(
                customer=dealer.stripe_customer_id,
                invoice=invoice.id,
                amount=int(car.sale_report.total_boxes_price * 100),
                currency="cad",
                description=f"Name: {car.name}, QR Code: {car.sticker_id}",
            )
        res = stripe.Invoice.finalize_invoice(invoice.id)
        log(log.INFO, "invoice created for dealer [%s]", dealer.email)
        gifts_invoice = m.GiftsInvoice(
            dealer_id=dealer.id,
            stripe_invoice_id=invoice.id,
            hosted_invoice_url=res.hosted_invoice_url,
        )
        db.session.add(gifts_invoice)
        db.session.commit()
        stripe.Invoice.modify(
            invoice.id, metadata={"gifts_invoice_id": gifts_invoice.id}
        )
        stripe.Invoice.send_invoice(invoice.id)
        log(log.INFO, "invoice sent to dealer [%s]", dealer.email)
