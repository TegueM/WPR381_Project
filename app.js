const readline = require('readline');
const art = require('ascii-art'); // npm install ascii-art
const compress = require('./compress');
const extract = require('./extract');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// import the modules

const getInput = () => {
    return new Promise((resolve, reject) => {
        rl.question('Would you like to \'Compress Folders\' or \'Extract folders\' ?...', (option) => {
            executeOption(option);
            resolve();
        })
        
    })
}

const run = async () => {
    try {
        let rendered = await art.font("Welcome to the amazing extracti-nator!", 'doom').completed();
        console.log(rendered);
    } catch (error) {
        console.log("nope");
    }
    await getInput();
    rl.close();
}

run();

function executeOption(option){
    if (option.toLowerCase() == 'compress folder' || option.toLowerCase() == 'c') {
        //console.log('You chose compression');
        try {
            rl.question('Please enter the file path you want to compress...', (path) => {
                compress(validateInput(path));
            });
        } catch (error) {
            console.log('Error: Could not compress file/s');
        }
    } 
    else if (option.toLowerCase() == 'extract folder' || option.toLowerCase() == 'e') {
        console.log('You chose extraction');
        //call the appropriate method for extraction
        try {
            rl.question('Please enter the file path you want to extract...', (path) => {
                extract(validateInput(path));
            })
        } catch (error) {
            console.log('Error: Could not extract file/s');
        }
    }
    else {
        console.log('Please choose a valid option');
        run();
    }
}

function validateInput(path){
    if (path == null) {
        console.log('Please provide a path');
        run();
    } else {
        return path;
    }
}