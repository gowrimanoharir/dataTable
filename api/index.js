const csvdata = require('csvdata'); 

function api(app) {
  app.get('/payments', function(request, response){

    const csvOptions = {  
      delimiter: ',',
      encoding: 'utf8',
      log: true,
      objName: 'ID',
      parse: true,
      stream: false
    }  
    csvdata.load('./api/data/payments.csv', csvOptions).then(data => {
      response.json(data)
    }).catch(err => {
      response.status(422).json(err);
      throw new Error(err);
    });
  })

  app.post('/payments', function(request, response){
    const data = request.body;
    let updated = {};
    for(let eachKey in data) {
      let item = data[eachKey]
      const { Description = ''} = item;
      //wrap description in quotes so as to allow commas in description text and not break the csv
      item.Description = `\"${Description}\"`;
      updated[eachKey] = item;
    }
    const header = 'ID,Name,Description,Date,Amount';
    const csvOptions = {  
      append: false,
      delimiter: ',',
      empty: false,
      encoding: 'utf8',
      header: header,
      log: true
    }
    csvdata.write('./api/data/payments.csv', updated, csvOptions).then(() => {
      response.status(200).send('success')
    }).catch(err => {
      response.status(422).json(err)
    });
  })  
}

module.exports = api;