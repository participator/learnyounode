// Dependencies
const http = require('http');
const bufferList = require('bl');

// Global Variables
const url = process.argv[2];

http.get(url, response => {

    // Approach #1
    response.setEncoding('utf8');
    let responseData ='';
    response.on('data', chuck => {
        responseData += chuck;
    });

    response.on('end', () => {
        console.log(responseData.length);
        console.log(responseData);
    });

    // Approach #2
    response.pipe(bufferList((err, data) => {
        if (err) console.error(err);
        console.log(data.length);
        console.log(data.toString());  // toString turns buffer into string
    }));

    response.on('error', console.error);
})