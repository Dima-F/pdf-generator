# This is simple wrapper for [pdfmake](http://pdfmake.org) lib

## Usage
npm i --save @fiialo/pdf-generator

## Then in code

```javascript
    const generator = require('@fiialo/pdf-generator');
    //definition here is in pdfmake format - with required content property
    var definition = {
      content: [
        // if you don't need styles, you can use a simple string to define a paragraph
        'This is a standard paragraph, using default style',

        // using a { text: '...' } object lets you set styling properties
        { text: 'This paragraph will have a bigger font', fontSize: 15 },

        // if you set pass an array instead of a string, you'll be able
        // to style any fragment individually
        {
          text: [
            'This paragraph is defined as an array of elements to make it possible to ',
            { text: 'restyle part of it and make it bigger ', fontSize: 15 },
            'than the rest.'
          ]
        }
      ]
    };
    //this will create by default pdf directory (always created at current working directory) and uuid as pdf file's name
    generator.create(definition);
    //or you can define manual settings
    generator.create(definition,'pdf/invoices','invoice123');
```
## Find us in [github](https://github.com/Dima-F/pdf-generator)
