const path = require('path');

module.exports = {
    Roboto: {
        normal: path.join(process.cwd(),'fonts/roboto/Roboto-Regular.ttf'),
        bold: path.join(process.cwd(),'fonts/roboto/Roboto-Medium.ttf'),
        italics: path.join(process.cwd(),'fonts/roboto/Roboto-Italic.ttf'),
        bolditalics: path.join(process.cwd(),'fonts/roboto/Roboto-MediumItalic.ttf')
    },
	Montserrat: {
		normal: path.join(process.cwd(),'fonts/montserrat/Montserrat-Regular.ttf'),
		bold: path.join(process.cwd(),'fonts/montserrat/Montserrat-Medium.ttf'),
		italics: path.join(process.cwd(),'fonts/montserrat/Montserrat-Italic.ttf'),
		bolditalics: path.join(process.cwd(),'fonts/montserrat/Montserrat-MediumItalic.ttf')
	},
	Librebaskerville:{
		normal: path.join(process.cwd(),'fonts/librebaskerville/LibreBaskerville-Regular.ttf'),
		bold: path.join(process.cwd(),'fonts/librebaskerville/LibreBaskerville-Bold.ttf'),
		italics: path.join(process.cwd(),'fonts/librebaskerville/LibreBaskerville-Italic.ttf'),
		bolditalics: path.join(process.cwd(),'fonts/librebaskerville/LibreBaskerville-Italic.ttf')
	}
};
