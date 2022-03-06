# API

Contents:

- RESTful API

The API is written in nodejs, express and starts running with the command `npm start`.

Main file is *index.js* which starts the application on port **9103** and connects to all endpoints.

Connection with the database is done through the file *connect.js* using username `user` and blank password on the database `tolltag` hosted at `localhost`.

In folder *endpoints* is the code for each endpoint, while child folder *endpoints/admin* contains the code for administrative endpoints.

Documentation for all endpoints can be found in the file *tolltag.postman_collection.json*.
