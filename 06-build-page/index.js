const fs = require('fs');
const path = require('path');

const resultPath = path.join(__dirname, 'project-dist/');
const componentsPath = path.join(__dirname, 'components/');
const stylesPath = path.join(__dirname, 'styles/');


function createHlmlFile() {
    const reader = fs.createReadStream(path.join(__dirname, 'template.html'));
    const writer = fs.createWriteStream(path.join(resultPath, 'index.html'));

    let result = '';
    reader.on('data', (temp) => {
        result = temp.toString();
    });

    let components = new Map();
    reader.on('end', () => {
        fs.readdir(componentsPath, (err, files) => {
            for (let i = 0; i < files.length; i++) {
                const componentReader = fs.createReadStream(path.join(componentsPath, files[i]));
                componentReader.on('data', (chunk) => {
                    let tag = "{{" + path.basename(files[i], path.extname(files[i])) + "}}";
                    components.set(tag, chunk.toString());
                    if (components.size === files.length) {
                        let tmp = [];
                        result.split("\r\n").forEach(line => {
                            let tempLine = line;
                            if (tempLine.includes("{{")) {
                                while (tempLine !== '') {
                                    let x = tempLine.indexOf("{{");
                                    let y = tempLine.indexOf("}}");
                                    if (x !== -1 && y !== -1) {
                                        let tagData = components.get(tempLine.substring(x, y + 2));
                                        tmp.push(tempLine.substring(0, x - 1) + tagData);
                                        tempLine = tempLine.substring(y + 2);
                                    } else {
                                        tmp.push(tempLine);
                                        tempLine = '';
                                    }                                                                          
                                }                                
                            } else {
                                tmp.push(tempLine);
                            }
                        });
                        writer.write(tmp.join("\r\n"));
                    }
                });
            }
        });
    })
}

function createCssFile() {
    const writer = fs.createWriteStream(path.join(resultPath, 'style.css'));

    const dirr = fs.readdir(stylesPath, (err, files) => {
        files.forEach(file => {
            if (path.extname(file) === ".css") {
                const styleReader = fs.createReadStream(path.join(stylesPath, file));
                let result = '';

                styleReader.on('data', (temp) => {
                    result += temp.toString();
                });

                styleReader.on('end', () => {
                    writer.write(result);
                })
            }    
        });
    });
}


function copyFilesFromDirectory(oldPath, newPath) {
    const dirr = fs.readdir(oldPath, (err, files) => {
        files?.forEach(file => {
            fs.copyFile(
                path.join(oldPath, file),
                path.join(newPath, file),
                (err) => {}
            );
        })
    });
}


function coppyAssets(fileName) {
    let oldFolderName = path.join(__dirname, fileName);
    let newFolderName = path.join(resultPath, fileName);    
    fs.mkdir(newFolderName, { recursive: true }, (err) => {
        const dirr = fs.readdir(oldFolderName, (err, files) => {
            files?.forEach(file => {
                fs.stat(path.join(oldFolderName, file), (err, stats) => {
                    if (stats.isFile()) {
                        fs.copyFile(path.join(oldFolderName, file), path.join(newFolderName, file), (err) => {});
                    } else {
                        coppyAssets(path.join(fileName, file));
                    }              
                });
            })
        });
    });
}

function task6() {
    fs.mkdir(resultPath, { recursive: true }, (err) => {});
    createHlmlFile();
    createCssFile();
    coppyAssets('assets');   
}

task6();