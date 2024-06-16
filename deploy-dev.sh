#!/bin/bash

cd "$REMOTE_DIR" || exit
git pull origin "$BRANCH"
npm run deploy
