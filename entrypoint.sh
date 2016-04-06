#!/bin/sh
cd /usr/src/app

#Install all packages from Package.json.
npm install

#For updating
#npm install -g npm-check-updates
#ncu -d -u --packageData

npm start
