#!/bin/bash
git pull
docker compose build
if [ $? -eq 0 ]
then
    docker compose up -d
else
    echo Build failed
fi
