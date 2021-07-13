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
	})
  
	return arrayOfFiles
  }

//method to compress mutliple folders
function compressFiles(dirPath){
	
	getAllFiles(dirPath).forEach(element => {

		let dashArray = element.split("\\");
		let l = dashArray.length;

		if (element.endsWith('.zip')){
			console.log(element + " already compressed!");
		} else {
			var output = fs.createWriteStream(element + '.zip');
		
			var archive = archiver('zip');
		}
	
		output.on('close', function () {
			console.log(archive.pointer() + ' total bytes');
			console.log(element);
		});

		archive.on('warning', function(err) {
			if (err.code === 'ENOENT') {
				console.log(`Something went wrong: ${err.code}`);
			} else {
				throw err;
			}
		});

		archive.on('error', function(err){
			throw err.toString();
		});

		archive.pipe(output);

		archive.directory(element, false);

		archive.finalize();
	});


	var output = fs.createWriteStream(dirPath + '.zip');
			
	var archive = archiver('zip');

	output.on('close', function () {
		console.log(archive.pointer() + ' total bytes');
		//console.log(element);
	});

	archive.on('warning', function(err) {
		if (err.code === 'ENOENT') {
			console.log(`Something went wrong: ${err.code}`);
		} else {
			throw err;
		}
	});

	archive.on('error', function(err){
		throw err.toString();
	});
	
	archive.pipe(output);
	
	archive.directory(dirPath, false);
	
	archive.finalize();
}

//compressFiles(dirPath1);

module.exports = compressFiles;