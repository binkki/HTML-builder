const fs = require('fs');
const path = require('path');

function copyFolder() {
    let oldFolderName = path.join(__dirname, 'files');
    let newFolderName = path.join(__dirname, 'files-copy');    
    fs.rm(newFolderName, { recursive: true, force: true }, (err) => {
        fs.mkdir(newFolderName, { recursive: true }, (err) => {
            const dirr = fs.readdir(oldFolderName, (err, files) => {
                files.forEach(file => {
                    fs.copyFile(
                        path.join(oldFolderName, file),
                        path.join(newFolderName, file),
                        (err) => {}
                    );
                })
            });
        });
    });
}

copyFolder();