let dirPath1 = 'C:/Users/YourSelf/Desktop/Test1'; //file extraction path

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
  };

//unzipFiles(dirPath1);
//removeDir(dirPath1);

module.exports = unzipFiles;