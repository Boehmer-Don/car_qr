import json
from app import db, models as m
from app.logger import log


def create_models():
    with open("tests/db/test_models.json", "r") as f:
        models_data = json.load(f)
        for car in models_data:
            vehicle_type_name = car["vehicle_type"]
            vehicle_type = db.session.scalar(m.CarType.select().where(m.CarType.name == vehicle_type_name))
            if not vehicle_type:
                vehicle_type = m.CarType(name=vehicle_type_name)
                vehicle_type.save()
                log(
                    log.INFO,
                    "Adding %s...",
                    vehicle_type_name,
                )
            make_name = car["make"]
            make = db.session.scalar(m.CarMake.select().where(m.CarMake.name == make_name))
            if not make:
                make = m.CarMake(name=make_name)
                make.save()
            model_name = car["model"]
            model = db.session.scalar(m.CarModel.select().where(m.CarModel.name == model_name))
            log(log.INFO, "Model %s %s", make_name, model_name)
            if not model:
                log(log.INFO, "Model does not exist %s", model_name)
                model = m.CarModel(
                    name=model_name,
                    make_id=make.id,
                    type_id=vehicle_type.id,
                )
                model.save()
            model_trims = car["trims"]
            trims = db.session.scalars(m.CarTrim.select().where(m.CarTrim.model_id == model.id)).all()
            log(log.INFO, "Trims %s", trims)
            if not trims:
                # log(log.INFO, "Trims for model %s do not exist %s", model, trims)
                for trim_name in model_trims:
                    trim = m.CarTrim(
                        name=trim_name,
                        model_id=model.id,
                    )
                    trim.save()
                    log(log.INFO, "Trim %s, %s", trim, trim.model)

        makes_count = db.session.query(m.CarMake).count()
        models_count = db.session.query(m.CarModel).count()
        log(log.INFO, "Total makes: %s", makes_count)
        log(log.INFO, "Total models: %s", models_count)

        # trims = db.session.scalars(m.CarTrim.select()).all()
        # for trim in trims:
        #     print(trim.name, trim.model)
