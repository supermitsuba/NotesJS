#!/bin/sh
tagVersion=$1
apiAddress=$2

echo "Using Docker Tag Version: ${tagVersion}"
echo "Using API Address       : ${apiAddress}"

envFile="export const environment = { production: false, url: 'http://${apiAddress}:5000' };"

# remove dist folder
rm -rf ./dist

# set the api address
echo "Writing file to src/environments/environment.prod.ts"
echo "$envFile" > "./src/environments/environment.prod.ts"

# build the software
echo "Building angular"
ng build --prod

# build docker image
echo "Building docker image"
docker build --no-cache -t supermitsuba/notejs:${tagVersion} .

# push image to docker hub
if [ $# -eq 3 ]
  then
    echo "Publishing docker image"
    docker push supermitsuba/notejs:${tagVersion}
fi