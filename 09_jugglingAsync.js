// Dependencies
const http = require('http');

const urls = process.argv.slice(2);

let responseDataList = [];

let counter = 0;
const responseObjConstructor = {
    id: 0,
    url: '',
    data: '',
};
let current = 0;

urls.forEach(url => {
    const responseObj = Object.create(responseObjConstructor);
    responseObj.id = counter++;
    responseObj.url = url;
    responseDataList.push(responseObj);

    http.get(url, res => {

        res.setEncoding('utf8'); // returns string object to data event
        res.on('data', string => {
            const responseObj = responseDataList.find(responseObj => {
                return responseObj.url === url;
            });
            responseObj.data += string;
        });
        res.on('close', () => {
            console.log('[Interruption] connection closed before response was ended.');
        })

        res.on('error', console.error);

        // TODO: find out difference between response.end and response.close and http.finish events
        res.on('end', (data, encoding) => {
            current++;
    
            if (counter === current) {
                responseDataList.forEach(responseObj => {
                    console.log(responseObj.data);
                })
            }
        });
    })
    .on('error', console.error);
    //.on('finish', () => console.log('response sent')); // emitted when the response is sent to the OS (not when it is received by the client)
});