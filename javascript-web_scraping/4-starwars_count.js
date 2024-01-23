#!/usr/bin/node
const request = require('request');
const url = process.argv[2];

request(url, (err, response, body) => {
  if (err) {
    console.error(err);
  }

  let Count = 0;
  const movies = JSON.parse(body).results;
  for (const movie of movies) {
    for (const character of movie.characters) {
      if (character.includes('/18/')) {
        Count++;
      }
    }
  }
  console.log(Count);
});
