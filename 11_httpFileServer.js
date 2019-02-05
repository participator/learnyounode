// Dependencies
const http = require('http');
const fs = require('fs');

// Global variables
const port = parseInt(process.argv[2]);
const filePath = process.argv[3];

const server = http.createServer((req, res) => {
    const file = fs.createReadStream(filePath);
    file.pipe(res);
    // res.end(); file is a stream.Readable which by default closes the writer (res) when the reader (file) ends
});

// Another way
// server.on('request', (req, res) => {
//     const file = fs.createReadStream(filePath);
//     file.pipe(res, {end: false});
//     file.on('end', () => {
//         res.end('[complete]');
//         console.log('[complete]');
//     })
// })

server.listen(port);