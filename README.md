# node-file-upload
This app uses multer to upload only jpg/jpeg file.
It can also be used via docker image and docker compose file that will start the server.

- Clone this repo and run
```npm install```
- Start a REST API on port **8081**.
- Listen to POST ```/images``` request to upload a JPG/JPEG file with fieldName ```myImage```.
- Required x-test header with same name as the image.
The file is saved in WEBP format in local disk using **sharp** module.

## Using Docker Compose file
*Need to install docker and docker compose*

Dockerfile contains all of the instructions used to build out the application image. Services are defined in docer-compose.yml file.

To build the app, run:
```docker-compose up```.
After the images are built, the application will start at port 8081.

## Building Docker Image
Download and run the image:
```docker run ankitashrma/node-file-upload```

To access the image:
```docker run -d -P --name node-file-upload ankitashrma/node-file-upload```

Use the port from following command:
```docker port node-file-upload```

You can also run on custom port:
```docker run -p 8888:8081 ankitashrma/node-file-upload```
and open http://localhost:8888 in your browser.

