// Dependencies
const http = require('http');
const url = require('url');

// Global variables
const port = process.argv[2];

const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.end('only GET request accepted');
    }

    const urlObj = url.parse(req.url, true);
    const utcToConvert = urlObj.query.iso;
    const date = new Date(utcToConvert);

    res.writeHead(200, {
        'Content-Type': 'application/json',
    });

    if (urlObj.pathname.includes('api/parsetime')) {
        res.write(JSON.stringify({
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        }));
    }
    else if (urlObj.pathname.includes('api/unixtime')) {
        res.write(JSON.stringify({
            unixtime: date.getTime()
        }));
    }

    res.end(); // end response
});

server.listen(port);