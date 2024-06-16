#!/bin/bash

cd "$REMOTE_DIR" || exit
git pull origin "$BRANCH"
npm i --force
npm run build
pm2 restart App
