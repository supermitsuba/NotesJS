#!/bin/sh
tagVersion=$1

echo "Using Docker Tag Version: ${tagVersion}"

# build docker image
echo "Building docker image"
docker build --no-cache -t supermitsuba/notesjs-webapi:${tagVersion} .

# push image to docker hub
if [ $# -eq 2 ]
  then
    echo "Publishing docker image"
    docker push supermitsuba/notesjs-webapi:${tagVersion}
fi