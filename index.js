const fs = require('fs');
const csv = require('csv-parser');

const ES = {};

const fields2model = (data, dataModel ) => {
  const keys = data.KEY.split('.');
  let object = dataModel;
  while (keys.length) {
    let i = keys.shift();
    if (keys.length) {
      if (!object.hasOwnProperty(i)) object[i] = /^\d+$/.test(keys[0]) ? [] : {};
      object = object[i];
    }
    else {
      object[i] = data.ES;
    }
  }
}


fs.createReadStream('yourFile.csv')
  .pipe(csv())
  .on('data', (row) => {
    fields2model(row, ES);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    fs.writeFile('data.json', JSON.stringify(ES), () => {
      console.log('Success');
    })
  });






