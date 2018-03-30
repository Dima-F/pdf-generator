const path = require('path');
const moment = require('moment');
const BasePDF = require('./BasePDF');
const modelsRegistry = require('erpjs/core/server/internals/modelsRegistry');

module.exports = class InvoicePDF extends BasePDF {
    constructor(datadef){
        super(datadef);
    }
    getLogoMargin(data){
        let margin = [0,220,0,0];//standart margin for 1 item
        for(let i=0;i<data.InvoicesMatrix.payload.length-1;i++){
            margin[1]-=15;
        }
        return margin;
    }
    async getDefinition(data){
        //changing locales localy
        moment.locale('en');
        let clients = await modelsRegistry.find('Contacts',{where:{ fCode : data.fCustCode}});
        if(clients.length===0) throw `There are no contacts with code ${data.fCustCode}`;
        let client = clients[0];
        let docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            // [left, top, right, bottom]
            pageMargins: [ 40, 20, 20, 20 ],
            defaultStyle:{
                font:'Montserrat'
            },
            content: [
                { text: 'PRO FORMA INVOICE', style: 'header' },
                {
                    columns: [
                        {
                            width:'50%',
                            fontSize:10,
                            text:[
                                'Handelshaus OÜ\n',
                                '7 Pikk Street, Office 5\n',
                                '10123 Tallinn Estonia\n',
                                'Reg:\n',
                                'Tax number:\n',
                                'VAT:'
                            ]
                        },
                        {
                            width:'*',
                            fontSize:10,
                            text:[
                                { text : `Date: ${moment(data.fInvDate).format('DD/MM/YYYY')}\n`, alignment:'right'  },
                                { text : `Due date: ${moment(data.fPayDate).format('DD/MM/YYYY')}\n`, alignment:'right'  },
                                { text : `Pro forma invoice number: ${data.fSerNr}\n`, alignment:'right'  },
                                { text : `Reference number: ${data.fSerNr}`, alignment:'right'  }
                            ]
                        }
                    ],
                    margin:[0,5,0,5]
                },
                {
                    text:[
                        { text:'Customer:\n', style:'subheader'},
                        `${client.fName || client.fPerson}\n`,
                        `${client.fInvAddr1}\n`,
                        `${client.fInvAddr0}  ${client.fPostcode || client.fInvAddr3}\n`,
                        `${client.fInvCountryName || client.fCountryCode}`
                    ],
                    fontSize:10,
                    alignment:'left',
                    margin:[0,5,0,5]
                },
                {
                    table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        headerRows: 1,
                        widths: [100,'*',50,50,50,50],
                        body: [
                            [
                                {text:'Service',style:'tableHeader'},
                                {text:'Description',style:'tableHeader'},
                                {text:'Qty',style:'tableHeader'},
                                {text:'Unit price',style:'tableHeader'},
                                {text:'Tax',style:'tableHeader'},
                                {text:'Total amount',style:'tableHeader'}
                            ],
                            ['-','-','-','-','-','-']
                        ]
                    },
                    margin:[0,10,0,10],
                    fontSize:10
                },
                { text:'Terms and conditions:', style:'subheader'},
                {
                    columns: [
                        {
                            fontSize:10,
                            margin:[0,0,10,0],
                            width:'70%',
                            ul: [
                                {
                                    text: [
                                        'Price does not include any additional documents or shipping.For additional services, please contact us at ',
                                        { text:'info@hshaus.com', style:'link'}
                                    ]
                                },
                                {
                                    text: [
                                        'The order will be processed after the full payment as well as all necessary due diligence documentation',
                                        ' have been received by HandelsHaus. Please find our due diligence requirements at ',
                                        { text:'https://hshaus.com/due-diligence', style:'link'}
                                    ]
                                }

                            ]
                        },
                        {
                            width:'*',
                            fontSize:10,
                            table: {
                                headerRows: 3,
                                widths: ['50%','*'],
                                body: [
                                    [
                                        {text:'Sub total', style:'tableHeader'},
                                        {text:`${data.fSum4}`},
                                    ],
                                    [
                                        {text:'Tax',style:'tableHeader'},
                                        {text:'-'},
                                    ],
                                    [
                                        {text:'Total',style:'tableHeader'},
                                        {text:`${data.fSum4}`},
                                    ]
                                ]
                            }
                        }
                    ],
                    fontSize:12,
                    margin:[0,0,0,10]
                },
                { text:'Banking details:', style:'subheader'},
                {
                    fontSize:10,
                    margin:[5,0,0,0],
                    text:[
                        { text:'Handelshaus OÜ\n'},
                        { text:'Bank:\n'},
                        { text:'IBAN:\n'},
                        { text:'SWIFT:\n'},
                        { text:'Please quote pro forma invoice number in the payment reference.\n'}
                    ]
                },

                {
                    text:[
                        'For any questions related to this pro forma invoice please contact us at ',
                        { text:'info@hshaus.com', style:'link'}
                    ],
                    style:'footer'
                },
                {
                    image: path.join(process.cwd(),'images/hhlogo1.jpg'),
                    fit: [150, 300],
                    margin: this.getLogoMargin(data),
                    alignment:'right'
                }
            ],
            styles: {
                header: {
                    fontSize: 14,
                    font:'Librebaskerville',
                    bold: true,
                    color:'black',
                    alignment:'center',
                    //horizontal,vertical
                    margin: [0, 25]
                },
                subheader: {
                    font:'Librebaskerville',
                    bold:true,
                    fontSize:11
                },
                footer: {
                    fontSize:10,
                    margin:[0,10,0,0]
                },
                link: {
                    bold:true,
                    color:'blue'
                },
                tableHeader: {
                    bold:true,
                    font:'Librebaskerville',
                    fillColor: '#eeeeee',
                    fontSize:11
                }
            }
        };
        docDefinition.content.forEach((val)=>{
            if(val.hasOwnProperty('table')){
                if(val.table.hasOwnProperty('body')){
                    if(data.InvoicesMatrix){
                        val.table.body.splice(1,1);
                        data.InvoicesMatrix.payload.forEach((row)=>{
                            let rowArray = [];
                            rowArray.push(row.fArtCode);
                            rowArray.push(row.fSpec);
                            rowArray.push(row.fQuant);
                            rowArray.push(row.fPrice);
                            rowArray.push('-');//Tax here
                            rowArray.push(row.fSum);
                            val.table.body.push(rowArray);
                        });
                    }
                }
            }
        });
        return docDefinition;
    }
}
