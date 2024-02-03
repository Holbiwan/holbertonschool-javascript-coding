const fs = require('fs');

async function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const lines = data.trim().split('\n');
        const headers = lines[0].split(',');
        const students = { CS: [], SWE: [] };

        for (let i = 1; i < lines.length; i += 1) {
          const values = lines[i].split(',');

          const student = {};
          for (let j = 0; j < headers.length; j += 1) {
            student[headers[j]] = values[j];
          }

          students[student.field.toUpperCase()].push(student.firstname);
        }

        resolve(students);
      }
    });
  });
}

module.exports = { readDatabase };
