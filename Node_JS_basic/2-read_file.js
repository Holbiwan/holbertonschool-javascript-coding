const fs = require('fs');

const countStudents = (dataPath) => {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8').trim();
    const lines = data.split('\n');

    if (lines.length <= 1) {
      throw new Error('Cannot load the database');
    }

    const [header, ...studentLines] = lines;

    const studentGroups = studentLines.reduce((groups, line) => {
      const [firstname, lastname, age, field] = line.split(',').map((item) => item.trim());

      if (field) {
        groups[field] = groups[field] || [];
        groups[field].push({ firstname, lastname, age });
      }

      return groups;
    }, {});

    const totalStudents = Object.values(studentGroups).flat().length;

    console.log(`Number of students: ${totalStudents}`);

    for (const [field, students] of Object.entries(studentGroups)) {
      const studentNames = students.map((student) => student.firstname).join(', ');
      console.log(`Number of students in ${field}: ${students.length}. List: ${studentNames}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

module.exports = countStudents;
