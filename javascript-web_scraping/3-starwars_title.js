#!/usr/bin/node
const request = require('request');
const url = 'https://swapi-api.hbtn.io/api/films/' + process.argv[2];

request(url, (error, response, body) => {
  if (error) {
    console.error(error);
  } else if (response && response.statusCode === 200) {
    console.log(JSON.parse(body).title);
  } else {
    console.log('Error occurred. Status code: ' + (response ? response.statusCode : 'Unknown'));
  }
});
