#!/bin/bash

sudo docker build -t pdb . &&
  sudo docker run -p 5432:5432 pdb
