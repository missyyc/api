#!/bin/bash

git reset --hard
git pull origin HEAD
npm install
pm2 stop yyc-api -f
pm2 start /bin/server.js -n yyc-api