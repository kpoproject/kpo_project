#!/bin/bash

sudo docker build -t kpo_project . &&
  sudo docker run -p 127.0.0.1:8080:8080 kpo_project
