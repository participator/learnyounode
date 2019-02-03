const fs = require('fs');

const buffer = fs.readFileSync(process.argv[2], 'utf8');
const array = buffer.split('\n');
console.log(array.length - 1);