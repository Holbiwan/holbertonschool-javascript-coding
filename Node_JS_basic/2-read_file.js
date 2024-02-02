const fs = require('fs');

const countStudents = (dataPath) => {
  try {
    if (!fs.existsSync(dataPath) || !fs.statSync(dataPath).isFile()) {
      throw new Error('Cannot load the database');
    }

    const fileContent = fs.readFileSync(dataPath, 'utf-8').trim();
    const fileLines = fileContent.split('\n').filter((line) => line.trim() !== '');

    const studentGroups = fileLines.reduce((groups, line) => {
      const [firstname, lastname, age, field] = line.split(',').map((item) => item.trim());
      const updatedGroups = { ...groups };
      updatedGroups[field] = updatedGroups[field] || [];
      updatedGroups[field].push({ firstname, lastname, age });
      return updatedGroups;
    }, {});

    const totalStudents = Object.values(studentGroups).flat().length;

    console.log(`Number of students: ${totalStudents}`);

    for (const [field, students] of Object.entries(studentGroups)) {
      const studentNames = students.map((student) => student.firstname).join(', ');
      console.log(`Number of students in ${field}: ${students.length}. List: ${studentNames}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

module.exports = countStudents;
