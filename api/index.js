const csvdata = require('csvdata'); 

function api(app) {
  app.get('/payments', function(request, response){

    const csvOptions = {  
      delimiter: ',',
      encoding: 'utf8',
      log: true,
      objName: false,
      parse: true,
      stream: false
    }  
    csvdata.load('./api/data/payments.csv', csvOptions).then(data => {
      response.json(data)
    }).catch(err => {
      console.log(err)
      response.status(422).json(err)
    });
  })

  app.post('/payments', function(request, response){
    const data = request.body;
    const updated = data.map(item => {
      const { Description = ''} = item;
      item.Description = Description.includes(',') ? `\"${Description}\"` : Description;
      return item;
    })
    const header = 'ID,Name,Description,Date,Amount';
    const csvOptions = {  
      append: false,
      delimiter: ',',
      empty: false,
      encoding: 'utf8',
      header: header,
      log: true
    }
    console.log(data)
    csvdata.write('./api/data/payments.csv', updated, csvOptions).then(() => {
      response.status(200).send('success')
    }).catch(err => {
      response.status(422).json(err)
    });
  })  
}

module.exports = api;