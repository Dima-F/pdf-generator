const InvoicePDF = require('./classes/InvoicePDF');

module.exports = (datadef)=>{
    switch (datadef) {
        case 'Invoices': return new InvoicePDF(datadef);
    }
}
