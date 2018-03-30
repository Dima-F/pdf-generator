
const PdfPrinter = require('pdfmake/src/printer');
const fs = require('fs');
const path = require('path');
const fonts = require('../fonts');

module.exports = class BasePDF {
    constructor(datadef){
        this.fonts = fonts;
        this.printer = new PdfPrinter(this.fonts);
        this.datadef = datadef;
    }
    async getDefinition(data){
        throw 'This method must be overriden!';
    }
    async generatePdf(data){
        //envolved in try catch to prevent errors in create, update operations
        try{
            if(!data) throw 'Wrong arguments in pdfManager.generatePdf';
            let definition = await this.getDefinition(data);
            let pdfDoc = this.printer.createPdfKitDocument(definition);
            let pdfDirectory = path.join(process.cwd(),`pdf/${this.datadef}/${data.fUuid}`);
            this._createFullPath(pdfDirectory);
            pdfDoc.pipe(fs.createWriteStream(path.join(pdfDirectory,`${data.fSerNr}.pdf`)));
            pdfDoc.end();
        } catch(err){
            console.log(err);
        }
    }
    removePdf(data){
        if(!data) throw 'Wrong arguments in pdfManager.removePdf';
        this._deleteFolderRecursive(path.join(process.cwd(),`pdf/${this.datadef}/${data.fUuid}`));
    }
    _deleteFolderRecursive(path) {
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
    _createFullPath(pathToCreate){
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
}
