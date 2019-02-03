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

        res.on('error', console.error);

        // TODO: find out difference between response.end and http.close and http.finish events
        res.on('end', () => {
            const responseObj = responseDataList.filter(responseObj => {
                return responseObj.id === current;
            });
            console.log('[close event]', responseObj);
            current++;
        });
    })
    .on('error', console.error)
    // .on('close', () => {
    //     const responseObj = responseDataList.find(responseObj => {
    //         return responseObj.id === current;
    //     });
    //     console.log(responseObj.data);
    //     current++;
    // })
});