const fs = require('fs');

const countStudents = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const rows = data.trim().split('\n').filter((element) => element.length > 0);

      const fields = {};
      rows.forEach((element) => {
        const row = element.split(',');
        if (row[3] in fields) {
          fields[row[3]].push(row[0]);
        } else {
          fields[row[3]] = [row[0]];
        }
      });

      const totalStudents = rows.length;
      console.log(`Number of students: ${totalStudents}`);

      for (const field in fields) {
        if (field) {
          const list = fields[field];
          console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
        }
      }

      resolve();
    });
  });
};

module.exports = countStudents;
