const fs = require('fs');
const path = require('path');
const readline = require('readline');

function writeDataToFile() {
    const writer = fs.createWriteStream(path.join(__dirname, 'text.txt'));
    const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "\nPlease input data you want to be written in text file.\nTo close program write 'exit' or press Ctrl+C.\n\n"
    });

    reader.prompt();

    reader.on('SIGINT', () => {
        console.log("\nGood bye. Have a nice day.\n");
        writer.end();
        reader.close();
    });

    reader.on('line', (temp) => {
        if (temp.toLowerCase() === 'exit') {
            reader.emit('SIGINT');
        } else {
            writer.write(temp);
            reader.prompt();
        }        
    });
}

writeDataToFile();