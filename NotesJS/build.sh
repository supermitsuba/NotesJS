#!/bin/sh
tagVersion=$1

echo "Using Docker Tag Version: ${tagVersion}"

# remove dist folder
rm -rf ./dist

# build the software
echo "Building angular"
ng build --prod

# build docker image
echo "Building docker image"
docker build --no-cache -t supermitsuba/notejs:${tagVersion} .

# push image to docker hub
if [ $# -eq 2 ]
  then
    echo "Publishing docker image"
    docker push supermitsuba/notejs:${tagVersion}
fi