const fs = require('fs');
const path = require('path');
const writer = fs.createWriteStream(path.join(__dirname, 'project-dist/', 'bundle.css'));
    
function readDataFromFile(filename) {
    const reader = fs.createReadStream(filename);
    let result = '';

    reader.on('data', (temp) => {
        result += temp.toString();
    });

    reader.on('end', () => {
        writer.write(result);
    })
}

function makeCssBundle() {
    const folderPath = path.join(__dirname, 'styles/');
        
    const dirr = fs.readdir(folderPath, (err, files) => {
        files.forEach(file => {
            if (path.extname(file) === ".css") {
                readDataFromFile(path.join(folderPath, file));
            }    
        });
    });     
}

makeCssBundle();