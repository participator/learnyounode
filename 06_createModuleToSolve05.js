//Dependencies
const filterFilesInDirByExtension = require('./06_module');

// Global
const dirName = process.argv[2];
const ext = process.argv[3];

function callback(err, data) {
    if (err) throw err;
    
    data.forEach(fileName => console.log(fileName));
}

filterFilesInDirByExtension(dirName, ext, callback);