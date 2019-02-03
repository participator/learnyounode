const fs = require('fs');
const file = process.argv[2]; // provided by learnyounode

// Read from file asynchronously
// Use encoding option to return a string
// If no encoding option, buffer is returned
fs.readFile(file, {encoding: 'utf8'}, (err, dataString) => {
    if (err) {
        throw err;
    }

    // Return count of newlines in file
    // There are no new lines at the end of file
    console.log(dataString.split('\n').length - 1);
});
