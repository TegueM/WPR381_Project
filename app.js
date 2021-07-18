const readline = require('readline');
//const art = require('ascii-art'); // npm install ascii-art

//User defined modules
const compress = require('./compress');
const extracting = require('./extract');
const deleted = require('./deleting');


//Application functionality starts
//Enable user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Interface
function startProgram() {
    rl.question('\n\nWelcome to the extractinator would you like to Compress or Extract?: \n1.Compress \n2.Extract \n3.Exit\n',(choice)=>{

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

//Compressing files
function getFileToCompress() {
    rl.question('Please enter the complete filepath to compress (Remember to replace backslashes with frontslashes):\n',(input)=>{

        const pathToCompress = input;

        try {
            compress(pathToCompress);
        } catch (error) {
            console.log('Error: Could not compress file/s' + error);
        }
        setTimeout(() => {
            startProgram();
        }, 3000);

    });
    
}

//Decompressing/Extracting files
function getFileToDecompress() {
    rl.question('Please enter the complete filepath to extrtact (Remember to replace backslashes with frontslashes):\nNote: You can either give path to a directory or a .zip file\n',(input)=>{

        const pathToDecompress = input;

        try {
            //Extract a path to a .zip file
            if (pathToDecompress.endsWith(".zip")){
                extracting.unzipRoot(pathToDecompress);
                const newPath = pathToDecompress.replace(".zip", "");

                setTimeout(() => {
                    extracting.unzipFiles(newPath);
                }, 1000);

                setTimeout(() => {
                    deleted(newPath);
                }, 2000);
            }
            //Extract a directory
            else{
                extracting.unzipFiles(pathToDecompress);
                setTimeout(() => {
                    deleted(pathToDecompress);
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