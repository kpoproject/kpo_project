#!/bin/bash

echo "Установка зависимостей для LibApp..."

pip3 install textual

echo "Установка завершена"


echo "Запуск LibApp.py"

cd ..
python3 LibApp.py

echo ""
echo "/////////////////////////////"
echo ""
echo "Для запуска используйте следующую команду в frontend (cd ..):"
echo "python3 LibApp.py"
echo ""
echo "/////////////////////////////"
