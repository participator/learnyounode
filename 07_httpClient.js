// Dependencies
const http = require('http');

// Global variables
const url = process.argv[2];
const port = 80;
console.log(url);
http.get(url, response => {
    // Most interesting reponse events: data, error, end
    
    response.setEncoding('utf8');  // Makes the data event emit strings instead of Buffer objects

    response.on('data', console.log);

    response.on('error', console.error);

    response.on('end', console.info);
}).on('error', console.error);