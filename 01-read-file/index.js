const fs = require('fs');
const path = require('path');

function readDataFromFile() {
    const reader = fs.createReadStream(path.join(__dirname, 'text.txt'));

    let result = '';

    reader.on('data', (temp) => {
        result += temp.toString();
    });

    reader.on('end', () => {
        console.log(result);
    })
}

readDataFromFile();