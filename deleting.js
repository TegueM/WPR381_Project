const fs = require('fs');
const remove = require('remove');
const path = require('path');

//After extraction, delete the .zip files
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

module.exports = removeZips;
