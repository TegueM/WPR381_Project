//install extract-zip module
//npm install extract-zip --save

const extract = require('extract-zip');
const fs = require('fs');
var path = require('path');

async function extractZip(source, target) {
    try {
      await extract(source, { dir: target });
      console.log("Extraction complete");
    } catch (err) {
      console.log("Oops: extractZip failed", err);
    }
}

const unzipFiles = async function (dirPath) {

   
        if (dirPath.endsWith('.zip')){
            await unzipRoot(dirPath);
            const newDirPath = dirPath.replace(".zip", "");
            await unzipFiles(newDirPath);
        }
        else{
			if (fs.existsSync(path)){
            const files = fs.readdirSync(dirPath);

            await Promise.all(
              files.map(async (file) => {
                if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                  await unzipFiles(dirPath + "/" + file);
                } else {
                  const fullFilePath = path.join(dirPath, "/", file);
                  const folderName = file.replace(".zip", "");
                  if (file.endsWith(".zip")) {
                    await extractZip(fullFilePath, dirPath);
                    await unzipFiles(dirPath + "/" + folderName);
                  }
                }
              })
            );
			}
        }
    
};

const unzipRoot = async function (dirPath) {
	
    const newRoot = dirPath.replace(".zip", "");

    await extractZip(dirPath, newRoot);
};

function removeZips(read) {
    const files = fs.readdirSync(read);
    for (const file in files) {
        try {
            if (files[file].endsWith('.zip')) {
                remove.removeSync(read + "/" + files[file]);
            }
        } catch (err) {
            console.error(err);
        }
    }
}

//unzipFiles(dirPath1);
//removeDir(dirPath1);

module.exports = {unzipFiles,removeZips};


//C:/Users/Johan Strauss/Documents/Uni/3rd Year/WPR381/TestData.zip
