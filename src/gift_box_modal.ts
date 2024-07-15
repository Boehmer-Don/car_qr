console.log("hi")


function giftModalState() {
    const plusButton = document.querySelectorAll('.plus-gift-box-item') as NodeListOf<HTMLButtonElement>
    const minusButton = document.querySelectorAll('.minus-gift-box-item') as NodeListOf<HTMLButtonElement>
    const form = document.querySelector('#gift-boxes-form') as HTMLFormElement
    const submitButton = document.querySelector('#gift-boxes-submit-form') as HTMLButtonElement

    const giftBoxAmount = document.querySelector('#gift-box-amount') as HTMLSpanElement
    const allowAmount = document.querySelector('#available-amount') as HTMLSpanElement

    // click plus button
    function onClickPlus(e: Event) {
        const target = e.target as HTMLButtonElement
        const input = target.previousElementSibling as HTMLInputElement
        const maxQty = parseFloat(input.getAttribute('max-qty') || '0')
        const minQty = parseFloat(input.getAttribute('min-qty') || '0')
        const price = parseFloat(input.getAttribute('price') || '0')
        const value = parseFloat(input.value) + 1
        const card = target.closest('.box-item') as HTMLElement
        let newAmount = 0
        let newValue = 0

        if (value > maxQty) {
            return
        }
        if (parseFloat(input.value) === 0 && minQty !== 0) {
            newValue = minQty
            newAmount = parseFloat(giftBoxAmount.innerText) + price * minQty
        } else {
            newValue = value
            newAmount = parseFloat(giftBoxAmount.innerText) + price
        }

        if (newAmount > parseFloat(allowAmount.innerText)) {
            return
        }
        input.value = newValue.toString()
        giftBoxAmount.innerText = newAmount.toFixed(1).toString()
        
    
    }

    // click minus button
    function onClickMinus(e: Event) {
        const target = e.target as HTMLButtonElement
        const input = target.nextElementSibling as HTMLInputElement
        const price = parseFloat(input.getAttribute('price') || '0')
        const minQty = parseFloat(input.getAttribute('min-qty') || '0')
        const card = target.closest('.box-item') as HTMLElement
        const value = parseFloat(input.value) - 1

        if (value < 0) {
            return
        }
        if (value < minQty) {
            giftBoxAmount.innerText = (parseFloat(giftBoxAmount.innerText) - price * minQty).toString()
            input.value = '0'
            card.style.backgroundColor = "white"
            return
        }
        input.value = value.toString()
        giftBoxAmount.innerText = (parseFloat(giftBoxAmount.innerText) - price).toFixed(1).toString()
    }

    // submit form
    function handleSubmit() {
        if (!form.reportValidity()) {
            return
        }

        const input = form.querySelector('input[name="gift_boxes"]') as HTMLInputElement
        const boxes = document.querySelectorAll('input[name="gift_box"]') as NodeListOf<HTMLElement>
        const boxesData = Array.from(boxes).map((box: HTMLInputElement) => {
            const id = box.getAttribute('box-item-id') || ''
            const qty = parseFloat(box.value || '0')
            const totalPrice = parseFloat(box.getAttribute('price' || '0')) * qty
            return {
                dealerGiftItemId: id,
                totalPrice:  totalPrice,
                qty: qty
            }
        }).filter((box) => box.qty > 0)
        console.log(boxesData)
        input.value = JSON.stringify(boxesData)
        form.submit()
        submitButton.disabled = true
    }

    submitButton.addEventListener('click', handleSubmit)

    plusButton.forEach((button) => {
    button.addEventListener('click', onClickPlus)
    })

    minusButton.forEach((button) => {
        button.addEventListener('click', onClickMinus)
    })
}


giftModalState()
