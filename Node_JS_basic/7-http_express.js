const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  try {
    const databaseFile = process.argv[2] || 'database.csv';
    let consoleOutput = '';

    const originalConsoleLog = console.log;
    console.log = (message) => {
      consoleOutput += `${message}\n`;
      return null; // Fix the eslint error
    };

    await countStudents(databaseFile);

    consoleOutput = consoleOutput.trim();
    console.log = originalConsoleLog;

    res.send(`This is the list of our students\n${consoleOutput}`);
  } catch (error) {
    res.status(400).send(`This is the list of our students\n${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
