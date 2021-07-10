const fs = require('fs');

const removeFiles = function(path) {
    if (fs.existsSync(path)) {
        const files = fs.readdirSync(path)
    
        if (files.length > 0) {
            files.forEach(function(filename) {
            if (fs.statSync(path + "/" + filename).isDirectory()) {
                removeDir(path + "/" + filename);
            } else {
                if (filename.endsWith('.zip')){
                    fs.unlinkSync(path + "/" + filename);
                    console.log(path + "\\" + filename + " was removed");
                }         
            }
        })
    } else {
        console.log("No compressed files found in the " + path);
    }
    } else {
    console.log(path + " path not found.");
    }   
  }

//removeDir(pathToDir);

module.exports = removeFiles;