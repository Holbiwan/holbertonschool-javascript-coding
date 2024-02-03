const http = require('http');

const server = http.createServer((_, response) => {
  response.write('Hello Holberton School!');
  response.end();
}).listen(1245);

module.exports = server;
