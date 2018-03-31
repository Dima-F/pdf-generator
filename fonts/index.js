const path = require('path');

module.exports = {
    Roboto: {
        normal: path.join(__dirname,'roboto/Roboto-Regular.ttf'),
        bold: path.join(__dirname,'roboto/Roboto-Medium.ttf'),
        italics: path.join(__dirname,'roboto/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname,'roboto/Roboto-MediumItalic.ttf')
    },
	Montserrat: {
		normal: path.join(__dirname,'montserrat/Montserrat-Regular.ttf'),
		bold: path.join(__dirname,'montserrat/Montserrat-Medium.ttf'),
		italics: path.join(__dirname,'montserrat/Montserrat-Italic.ttf'),
		bolditalics: path.join(__dirname,'montserrat/Montserrat-MediumItalic.ttf')
	},
	Librebaskerville:{
		normal: path.join(__dirname,'librebaskerville/LibreBaskerville-Regular.ttf'),
		bold: path.join(__dirname,'librebaskerville/LibreBaskerville-Bold.ttf'),
		italics: path.join(__dirname,'librebaskerville/LibreBaskerville-Italic.ttf'),
		bolditalics: path.join(__dirname,'librebaskerville/LibreBaskerville-Italic.ttf')
	}
};
