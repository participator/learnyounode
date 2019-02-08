// Dependencies
const http = require('http');
const bl = require('bl');

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
        // console.log(`[callback ${responseObj.id} started]`);

        res.setEncoding('utf8'); // returns string object to data event

        res.on('data', string => {
            const responseObj = responseDataList.find(responseObj => {
                return responseObj.url === url;
            });
            responseObj.data += string;
            // console.log('[data]', responseObj.id);
        });

        // res.pipe(bl((error, data) => {console.log(`[pipe]`, data.toString())})); // Returns data right before response emits end event

        res.on('close', () => {
            // Emits when connection closes before response was ended
            console.log('[Interruption] connection closed before response was ended.');
        });

        res.on('error', console.error);

        // TODO: find out difference between response.end and response.close and http.finish events
        res.on('end', (data, encoding) => {  // Emits when request completes
            current++;
            // console.log(`[end ${responseObj.id}:]`, responseObj.data);
    
            if (counter === current) {
                responseDataList.forEach(responseObj => {
                    console.log(responseObj.data);
                    // console.log(`${responseObj.id}:`,responseObj.data);
                })
            }
        });
    })
    .on('error', console.error)
    
    .on('finish', () => { // emitted when the response is sent to the OS (not when it is received by the client)
        // In this example, this event runs before any data has a chance to be returned
        // console.log('[event finish]');
    })

});