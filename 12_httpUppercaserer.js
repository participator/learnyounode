// Dependencies
const http = require('http');
const map = require('through2-map');

// Global variables
const port = process.argv[2];

// http.request('POST');  // TODO: bug fix, test does no check that post method is being used

const server = http.createServer((req, res) => {
    if (req.method !== 'POST') {
        res.end('Only post accepted');
    }

    req.pipe(map(chuck => chuck.toString().toUpperCase())).pipe(res);
});

server.listen(port);