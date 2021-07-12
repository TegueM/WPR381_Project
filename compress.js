//npm install archiver
//npm install archiver --save
var archiver = require('archiver');
const fs = require('fs');
const path = require('path');

//Method to read list of folders and files
const getAllFiles = function(dirPath, arrayOfFiles) {
	files = fs.readdirSync(dirPath)
  
	arrayOfFiles = arrayOfFiles || []
  
	files.forEach(function(file) {
	  if (fs.statSync(dirPath + "/" + file).isDirectory()) {
		arrayOfFiles.push(path.join(dirPath, "/", file))
		arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
	  } else {
		arrayOfFiles.push(path.join(dirPath, "/", file))
	  }
	});
  
	return arrayOfFiles;
}

//method to compress mutliple folders
const compressFiles = function(dirPath1){
	getAllFiles(dirPath1).forEach(element => {
		if (!element.endsWith('.zip')){
			var output = fs.createWriteStream(element + '.zip');
			var archive = archiver('zip');
	
			output.on('close', function () {
				console.log(archive.pointer() + ' total bytes');
				console.log(element + ' compressed!');
			});
	
			archive.on('error', function(err){
				throw err;
			});
	
			archive.pipe(output);
			archive.finalize();
		}
		else {
			console.log(element + " already compressed!");
		}
	});
}

//compressFiles(dirPath1);

module.exports= compressFiles;