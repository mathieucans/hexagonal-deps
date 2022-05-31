#!/bin/bash
# https://stackoverflow.com/questions/28782656/how-to-run-node-js-app-with-es6-features-enabled

cd domain
npm run build
cd ..

cd storage
npm i
npm run build
cd ..

cd console-application
npm i
npm run build
npm run start
cd ..


