# Simple Flask App

1. Run

```bash
poetry install
```

2. Create '.env' file (simply copy file .env.sample):


3. Run

```bash
docker compose up d db
```

to create an docker container

4. Start with F5

5. Create db with command

```bash
flask db upgrade
```

6. In main folder need install node_modules to work with tailwind, run

```bash
yarn
```

db.session.scalar(sa.select(sa.func.count()).select_from(m.User))
db.session.scalars(sa.select(m.User)).all()
db.session.scalar(m.User.select().where(m.User.email == "dburimov@gmail.com"))
