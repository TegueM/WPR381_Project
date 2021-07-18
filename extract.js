//install extract-zip module
//npm install extract-zip --save

//NPM packages
const extract = require('extract-zip');
const fs = require('fs');
var path = require('path');

//Extract package
async function extractZip(source, target) {
    try {
		await extract(source, { dir: target });
      	console.log("Extraction complete");
      
    } catch (err) {
    }
}

//Method to read files in a directory and extract
const unzipFiles = async function (dirPath) {
	if (fs.statSync(dirPath).isDirectory()){
		const files = fs.readdirSync(dirPath);
			await Promise.all(
				files.map(async (file) => {
				if (fs.statSync(dirPath + "/" + file).isDirectory()) {
					await unzipFiles(dirPath + "/" + file);
				} else {
					if ((fs.existsSync(dirPath))){
						const fullFilePath = path.join(dirPath, "/", file);
						const folderName = file.replace(".zip", "");
						if (file.endsWith(".zip")) {
							await extractZip(fullFilePath, path.join(dirPath, "/", folderName));
							await unzipFiles(dirPath + "/" + folderName);								
						}
					}
				}
			})
		);
	}
};

//If user input ends with .zip, extract first and then "unzipFiles"
const unzipRoot = async function (dirPath) {
  const newRoot = dirPath.replace(".zip", "");

  await extractZip(dirPath, newRoot);
};

module.exports = {unzipFiles, unzipRoot};