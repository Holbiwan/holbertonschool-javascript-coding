#!/usr/bin/node
const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

request(url, (error, response, body) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }

  fs.writeFile(filePath, body, 'utf-8', (writeError) => {
    if (writeError) {
      console.error(`Error writing to file: ${writeError.message}`);
      process.exit(1);
    }

    console.log(`Content from ${url} successfully saved to ${filePath}`);
  });
});
