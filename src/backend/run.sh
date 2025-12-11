#!/bin/bash

sudo docker build -t back . &&
sudo docker run --network=kpo_net -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=postgres -e POSTGRES_DB=libralib -p 1337:8080 back
