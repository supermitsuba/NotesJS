# Notes JS

An application to save notes and organize thoughts on the go.  Why not use the 1,000,000 other options?  Because I need a playground for building software.  Also, the purpose of these notes is more like the concept of field notes.  This is the idea of quickly jotting down an idea in a small form factor, like a phone.  Something like this:  https://fieldnotesbrand.com/ , however digital.  I wanted something that could be used on any platform (with a browser) and I wanted access to my data.

## Pieces

There is a front end Angular 8 app and a back end server written in .net.  To orchastrate this, I have used docker to start/stop/build all steps of development.

## How to run

1. Angular

``` ng build --prod ``` or ``` npm run build --prod ```
``` ng serve ``` or ``` npm run start ```

2. .Net Core

``` dotnet run ```
``` dotnet publish ```

## How to deploy

1. Angular

The build script is under "./NotesJS/build.sh"

Build software example: ```sudo ./build.sh "tag1" true```

This will build and upload the latest image of the software to docker hub.  The first parameter is for tag version.  The second is just optional, if it exists, then it will upload to docker hub.  

To run the docker image: ``` docker run -d -p 8080:8080 - /host/appConfig.txt:/dest/assets/appConfig.txt supermitsuba/notejs:test ```

Note here that 8080 is the internal port to run the web app from.  In order to change the API addres, you can supply your own file to override the appConfig.txt.

2. .Net Core

The build script is under "./server/build.sh"

Build software example: ``` sudo ./build.sh "tag1" true```

Very similar to the Angular build script.  The first parametre is the tag name.  The last paramter, if it exists, will push the image to docker hub.

To run the docker image: ``` docker run -d -p 5000:80 -v /host/notes:/app/data supermitsuba/notesjs-webapi:test ```

Note 2 important pieces of information: 1. port number is 80 in the container, but you want to expose it as 5000.  2. The notes (currently) are stored on disk, so if you want to persist them, create a directory on the host to share.  