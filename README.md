# Simple Flask App

1. Run

```bash
poetry install
```

2. Create '.env' file (simply copy file .env.sample):

**_You need to set stripe credentials_**

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

```bash
flask get-products # create stripe products
flask create-admin # create admin
flask db-populate # populate database
flask create-models # add car models
```

6. In main folder need install node_modules to work with tailwind, run

```bash
yarn install
```

# Description:

#### Main entities

##### User, Label, Subscriprion, Gift box, Gift item, Sale report, Service record

##### user has several roles: (admin, dealer, seller, buyer, service, picker)

### User(role: admin):

invite, edit - dealer
<br>
add, edit - gift items
<br>
set gift item for dealer
<br>
generate label
<br>
assign label for a dealer
<br>
see inventory history
<br>
create service advisers

### User(role: dealer):

create service advisers
<br>
buy label, sell car, see achieve
<br>
gift box user
<br>
create seller, login as seller
<br>
see gift items

### User(role: seller):

set gift box and create (buyer)
<br>
see sold cars

### User(role: buyer, service):

set car oil change data (records)
<br>
see records

### User(role: picker):

pick up gift boxes
