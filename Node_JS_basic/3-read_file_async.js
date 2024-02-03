const fs = require('fs');

const countStudents = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const fileLines = data.trim().split('\n');
    const [...studentLines] = fileLines;

    const studentGroups = studentLines.reduce((acc, line) => {
      const [firstname, lastname, age, field] = line.split(',').map((item) => item.trim());
      const groups = { ...acc };
      groups[field] = groups[field] || [];
      groups[field].push({ firstname, lastname, age });
      return groups;
    }, {});

    const totalStudents = Object.values(studentGroups).flat().length;

    console.log(`Number of students: ${totalStudents}`);
    for (const [field, students] of Object.entries(studentGroups)) {
      const studentNames = students.map((student) => student.firstname).join(', ');
      console.log(`Number of students in ${field}: ${students.length}. List: ${studentNames}`);
    }

    resolve();
  });
});

module.exports = countStudents;
