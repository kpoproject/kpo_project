#!/bin/bash

sudo docker build -t pdb . &&
  sudo docker run pdb
