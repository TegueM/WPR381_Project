const readline = require('readline');
//const art = require('ascii-art'); // npm install ascii-art

const compress = require('./compress');
const extracting = require('./extract');
const deleted = require('./deleting');
const fs = require('fs');
const remove = require('remove');
const rimraf = require('rimraf');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// import the modules

/*const getInput = () => {
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
        console.log('You chose compression');
        // call the appropiate method for compression

        //compress("C:/Users/YourSelf/Desktop/Test1");

        const userPath = "C:/Users/Johan Strauss/Documents/Uni/3rd Year/WPR381/ProjectTests";

        try {
            compress(userPath);
        } catch (error) {
            //console.log('Error: Could not compress file/s' + error);
        }
    } 
    else if (option.toLowerCase() == 'extract folder' || option.toLowerCase() == 'e') {
        console.log('You chose extraction');
        //call the appropriate method for extraction

        const userPath = "C:/Users/Johan Strauss/Documents/Uni/3rd Year/WPR381/ProjectTests";

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
            //console.log('Error: Could not extract file/s');
        }
    }
    else {
        console.log('Please choose a valid option');
        run();
    }
}*/

/////////////////////////////////////////////////////////

function startProgram() {
    rl.question('Welcome to the extractinator would you like to Compress or Extract?: \n1.Compress \n2.Extract \n3.Exit\n',(choice)=>{

        switch (choice) {
            case '1'://compress

                getFileToCompress();
                
                break;

            case '2'://decopmress

                getFileToDecompress();
                
                break;

            case '3'://close program

                console.log('Goodbye');
                process.exit();
                break;

            default:
                console.log('No such option');
                startProgram();
                break;
        }

    })
    
}

function getFileToCompress() {
    rl.question('Please enter the complete filepath to compress:\n',(input)=>{

        const pathToCompress = input;
        

        try {

            compress.compressFiles(pathToCompress);

            setTimeout(() => {

                const filesInDir = fs.readdirSync(input);

                for (const file in filesInDir) {
                    if (filesInDir[file].endsWith('.zip') == false) {

                        console.log(filesInDir[file] + ' is a file/folder that will be deleted');
                        //remove.removeSync(pathToCompress + '/' + filesInDir[file]);

                        rimraf(pathToCompress + '/' + filesInDir[file],()=>{
                            console.log(filesInDir[file] + 'has been deleted')
                        })
                        setTimeout(() => {
                            fs.rmdir(pathToCompress + '/' + filesInDir[file],{recursive:true},(err)=>{
                                if (err) {
                                    throw err;
                                }
                        })
                        }, 5000);
                       
                        /*setTimeout(() => {
                            remove.removeSync(pathToCompress + '/' + filesInDir[file]);
                        }, 3000);*/
                    }
                }

            }, 3000);
            

        } catch (error) {
            console.log('Error: Could not compress file/s' + error);
        }
        setTimeout(() => {
            startProgram();
        }, 3000);

    });
    
}

function getFileToDecompress() {
    rl.question('Please enter the complete filepath to extrtact:\n',(input)=>{

        const pathToDecompress = input;

        try {
            if (pathToDecompress.endsWith(".zip")){
                extracting.unzipRoot(pathToDecompress);
                const newPath = pathToDecompress.replace(".zip", "");

                setTimeout(() => {
                    extracting.unzipFiles(newPath);
                }, 1000);

                setTimeout(() => {
                    extracting.removeZips(newPath);
                }, 2000);
            }
            else{
                extracting.unzipFiles(pathToDecompress);
                setTimeout(() => {
                    extracting.removeZips(pathToDecompress);
                }, 2000);
            }
        } catch (error) {
            console.log('Error: Could not extract file/s');
        }
        setTimeout(() => {
            startProgram();
        }, 3000);
        

    })
    
}

startProgram();
