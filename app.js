const readline = require('readline');
const art = require('ascii-art'); // npm install ascii-art
const compress = require('./compress');
const extract = require('./extract');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var userSelection;
var userPath;

const getSelection = () => {//promise to get user selection
    return new Promise((resolve, reject) => {
        rl.question('Would you like to \'Compress Folders\' or \'Extract folders\' ?...', (option) => {
            userSelection = option;
            resolve();
        })
    })
}

const getPath = () => {//promise to get the path from the user
    return new Promise((resolve, reject) => {
        rl.question('Please enter the file path you want to compress...', (path) => {
            userPath=path;
            resolve();
        }); 
    })
}

const run = async () => {
    try {
        let rendered = await art.font("Welcome to the amazing extracti-nator!", 'doom').completed();
        console.log(rendered);
    } catch (error) {
        console.log("Welcome to the amazing extracti-nator!");
    }
    await getSelection();
    await getPath();
    await executeOption(userSelection);
    rl.close();
}

run();

function executeOption(option){
    if (option.toLowerCase() == 'compress folder' || option.toLowerCase() == 'c') {
        console.log('You chose compression');
        try { 
            compress(validateInput(userPath));
            
        } catch (error) {
            console.log('Error: Could not compress file/s');
        }
    } 
    else if (option.toLowerCase() == 'extract folder' || option.toLowerCase() == 'e') {
        console.log('You chose extraction');

        try {
            extract.unzipFiles(validateInput(userPath));
            setTimeout(() => {
                extract.removeZips(userPath);

            }, 3000);
        } catch (error) {
            console.log('Error: Could not extract file/s');
        }
    }
    else {
        console.log('Please choose a valid option');
        run();
    }
}

function validateInput(p){
    if (p == null) {
        console.log('Please provide a path');
        run();
    } else {
        return p;
    }
}