#!/bin/bash

sudo docker build -t pdb . &&
  sudo docker run --name pdb_name --network kpo_net -e POSTGRES_PASSWORD=docker -p 5432:5432 pdb
  #sudo docker run --net kpo_net -p 5432:5432 pdb
