// Dependencies
const fs = require('fs');
const path = require('path');

function fileNamesFilteredByExt(dirName, ext, callback) {
    fs.readdir(dirName, (err, list) => {
        if (err) return callback(err);

        const filteredFileNames = list.filter(fileName => {
            return path.extname(fileName) === `.${ext}`;
        })
        
        callback(null, filteredFileNames);
    });
}


module.exports = fileNamesFilteredByExt;