const fs = require('fs');
const path = require('path');

function secretFolder() {
    const folderPath = path.join(__dirname, 'secret-folder/');
    const dirr = fs.readdir(folderPath, (err, files) => {
        files.forEach(file => {
            let filePath = path.join(folderPath, path.basename(file));
            fs.stat(filePath, (err, stats) => {
                if (stats.isFile()) {
                    let x = path.basename(file, path.extname(file));
                    let y = path.extname(file).replace('.', '');
                    console.log(`${x} - ${y} - ${stats.size / 1024}kb`);
                }                
            });
        });
    });
}

secretFolder();