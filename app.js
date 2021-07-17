const readline = require('readline');
//const art = require('ascii-art'); // npm install ascii-art

const compress = require('./compress');
const extracting = require('./extract');
const deleted = require('./deleting');

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
    /*
    try {
        let rendered = await art.font("Welcome to the amazing extracti-nator!", 'doom').completed();
        console.log(rendered);
    } catch (error) {
        console.log("nope");
    }
    */
    await getInput();
    rl.close();
}

run();

function executeOption(option){
    if (option.toLowerCase() == 'compress folder' || option.toLowerCase() == 'c') {
        console.log('You chose compression');
        // call the appropiate method for compression

        //compress("C:/Users/YourSelf/Desktop/Test1");

        const userPath = "C:/Users/YourSelf/Desktop/Test";

        try {
            compress(userPath);
        } catch (error) {
            console.log('Error: Could not compress file/s' + error);
        }
    } 
    else if (option.toLowerCase() == 'extract folder' || option.toLowerCase() == 'e') {
        console.log('You chose extraction');
        //call the appropriate method for extraction

        const userPath = "C:/Users/YourSelf/Desktop/Test.zip";

        try {
            if (userPath.endsWith(".zip")){
                extracting.unzipRoot(userPath);
                const newPath = userPath.replace(".zip", "");

                setTimeout(() => {
                    extracting.unzipFiles(newPath);
                }, 1000);

                setTimeout(() => {
                    extracting.removeZips(newPath);
                }, 2000);
            }
            else{
                extracting.unzipFiles(userPath);
                setTimeout(() => {
                    extracting.removeZips(userPath);
                }, 2000);
            }
        } catch (error) {
            console.log('Error: Could not extract file/s');
        }
    }
    else {
        console.log('Please choose a valid option');
        run();
    }
}