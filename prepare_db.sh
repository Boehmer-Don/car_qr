#!/bin/bash
flask db upgrade
flask add-labels
flask get-products
flask create-admin
flask db-populate

