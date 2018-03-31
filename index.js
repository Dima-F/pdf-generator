const PdfPrinter = require('pdfmake/src/printer');
const fs = require('fs');
const path = require('path');
const fonts = require('./fonts');
const uuid = require('uuid/v4');

let globalConfig = {
    filename:`${uuid()}.pdf`,
    directory:'pdf'
};

function deleteFolderRecursive(path) {
    if( fs.existsSync(path) ) {
        fs.readdirSync(path).forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

function createFullPath(pathToCreate){
    pathToCreate
    .split(path.sep)
    .reduce((currentPath, folder) => {
        currentPath += folder + path.sep;
        if (!fs.existsSync(currentPath)){
            fs.mkdirSync(currentPath);
        }
        return currentPath;
    }, '');
}

exports.create = (definition)=>{
    if(!definition || !definition.content) throw new Error('Create method must accept definition object with content property!');
    let printer = new PdfPrinter(fonts);
    let pdfDoc = printer.createPdfKitDocument(definition);
    let pdfDirectory = path.join(process.cwd(),globalConfig.directory);
    createFullPath(pdfDirectory);
    pdfDoc.pipe(fs.createWriteStream(path.join(pdfDirectory,`${globalConfig.filename}.pdf`)));
    pdfDoc.end();
};

exports.init = (config)=>{
    if(!config || !config.filename || !config.directory) throw 'Wrong config parameter!';
    globalConfig = config;
};

exports.delete = deleteFolderRecursive;
