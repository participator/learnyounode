// Dependencies
const net = require('net');
const strftime = require('strftime');

// Global Variables
const port = process.argv[2];
const fmt = '%F %R'; //'YYYY-MM-DD hh:mm';

const server = net.createServer(socket => {
    const date = new Date();
    const formattedDate = strftime(fmt, date);
    socket.write(formattedDate + '\n');
    socket.end();
    // or socket.end(data);
});
server.listen(port);