const fs = require('fs');
const file = process.argv[2]; // provided by learnyounode
const extToFilter = `.${process.argv[3]}`; // provided by learnyounode

fs.readdir(file, (err, list) => {
    list.filter(fileName => {
        return fileName.endsWith(extToFilter);
    })
    .forEach(fileName => console.log(fileName));
});

// Alternate Solution to check file extension
// var path = require('path');
// path.extname(file) === extToFilter;