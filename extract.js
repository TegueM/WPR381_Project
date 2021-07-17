//install extract-zip module
//npm install extract-zip --save

const extract = require('extract-zip');
const fs = require('fs');
var path = require('path');
const remove = require('remove');

async function extractZip(source, target) {
    try {
      await extract(source, { dir: target });
      console.log("Extraction complete");
    } catch (err) {
      console.log("Oops: extractZip failed", err);
    }
}
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

const unzipRoot = async function (dirPath) {
  const newRoot = dirPath.replace(".zip", "");

  await extractZip(dirPath, newRoot);
};

const removeZips = async function(dirPath) {
		if (fs.statSync(dirPath).isDirectory()){
		const files = fs.readdirSync(dirPath);
		await Promise.all(
			files.map(async (file) => {
			if (fs.statSync(dirPath + "/" + file).isDirectory()) {
				await removeZips(dirPath + "/" + file);
				} else {
					if ((fs.existsSync(dirPath))){
					const fullFilePath = path.join(dirPath, "/", file);
					const folderName = file.replace(".zip", "");
					if (file.endsWith(".zip")) {
						await remove.removeSync(fullFilePath);
						await removeZips(dirPath + "/" + folderName);
					}
				}
				}
			})
		);
	}
}

//unzipFiles(dirPath1);
//removeDir(dirPath1);

module.exports = {unzipFiles, unzipRoot, removeZips};