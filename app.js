const readline = require('readline');
//https://www.npmjs.com/package/figlet
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
    console.log('Welcome to the amazing extracti-nator!');
    await getInput();
    rl.close();
}

run();

function executeOption(option){
    if (option.toLowerCase() == 'compress folder' || option.toLowerCase() == 'c') {
        console.log('You chose compression');
        // call the appropiate method for compression
    } 
    else if (option.toLowerCase() == 'extract folder' || option.toLowerCase() == 'e') {
        console.log('You chose extraction');
        //call the appropriate method for extraction
    }
    else {
        console.log('Please choose a valid option');
        run();
    }
}