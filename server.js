const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const scraper = require("./public/javascripts/scraper.js");
const userFunctions = require("./public/javascripts/user_function.js")
const fm = require("./public/javascripts/functions.js");

const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('message', (text) => {
	return text;
})

//Helper function to convert json data into a table format to publish
hbs.registerHelper('json2table', (json) => {
  var cols = Object.keys(json[0]);
  
  var headerRow = '';
  var bodyRows = '';

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  cols.map(function(col) {
    headerRow += '<th>' + capitalizeFirstLetter(col) + '</th>';
  });

  json.map(function(row) {
    bodyRows += '<tr>';

    cols.map(function(colName) {
      bodyRows += '<td>' + row[colName] + '</td>';
    })

    bodyRows += '</tr>';
  });

  return '<table class=""><thead><tr>' + headerRow + '</tr></thead><tbody>' + bodyRows + '</tbody></table>'
})

//Loads index page
app.get('/', (req, res) => {
	res.render('index.hbs', {
        title: 'Scrape the deals with CanaFly!'
	});
});

//Loads login page
app.get('/login', (req, res) => {

	res.render('login.hbs', {
        title: 'Board and save with CanaFly!'
	});
});

//Loads register page
app.get('/register', (req, res) => {

  res.render('register.hbs', {
        title: 'Board and save with CanaFly!'
  });
});

//Temporary success page after creating account
app.get('/success', (req, res) => {

  const createAcc = async () => {
    try{
      await userFunctions.addUser(req.query['username'], req.query['password'], req.query['confirmpw'], req.query['fname'], req.query['lname']);
      await res.render('login.hbs', {
        title: 'Board and save with CanaFly!!'
      });
    } catch(error){
      console.log(error);
      res.render('error.hbs', {
        title: 'Uh oh refer to console',
        body: 'Passwords do not match'
      });
    }
  }

  createAcc();

});

//Loads results page
app.get('/results', (req, res) => {
  
  const runScraper = async () => {
    const results = await scraper.main(req.query['origin'], req.query['destination'], req.query['departDate'] ,req.query['returnDate']);
    await res.render('results.hbs', {
      title: 'Board and save with CanaFly!',
      json: results
    });
  }

  runScraper();

});

//Loads saved searches page
app.get('/saved', (req, res) => {
  
  const saveFunction = async () => {
  	await fm.addNote();
    const savedArray = await fm.getArray();

    var newArray = [];

    for(i = 0; i < savedArray.length; i++){
		newArray = newArray.concat(savedArray[i]);
    }

    await res.render('results.hbs', {
      title: 'Board and save with CanaFly!',
      json: newArray
    });
  }
  saveFunction();
});

//Loads error page
app.get('/error', (req, res) => {

  res.render('error.hbs', {
        title: 'Uh oh refer to console'
  });
});

app.listen(port, () => {
	console.log(`Server is up on the port ${port}`);
});