import { readDatabase } from '../utils';

class StudentsController {
  static async getAllStudents(request, response) {
    try {
      const { majors } = request.params;

      if (majors !== 'CS' && majors !== 'SWE') {
        response.status(500).send('Major parameter must be CS or SWE');
        return; // Added return statement to exit the function if the major parameter is invalid
      }

      const data = await readDatabase(process.argv[2]);
      const students = data[majors].join(', ');
      response.status(200).send(`List: ${students}`);
    } catch (error) {
      response.status(500).send('Failed to load the database');
    }
  }

  static async getAllStudents(req, res) {
    try {
      const databaseFile = process.argv[2] || '';
      const students = await readDatabase(databaseFile);

      if (!students || students.length === 0) {
        return res.status(500).send('Failed to load the database');
      }

      const majorCounts = new Map();

      students.forEach((student) => {
        const major = student.field.toLowerCase();
        majorCounts.set(major, (majorCounts.get(major) || 0) + 1);
      });

      let responseContent = 'List of students by major\n';

      const sortedMajors = [...majorCounts.entries()].sort(([a], [b]) =>
        a.localeCompare(b, undefined, { sensitivity: 'base' })
      );

      sortedMajors.forEach(([major, count], index) => {
        const majorStudents = students.filter((student) => student.field.toLowerCase() === major);
        const firstNames = majorStudents.map((student) => student.firstname).join(', ');
        responseContent += `Students in ${major.toUpperCase()}: ${count}. Names: ${firstNames}`;

        if (index < sortedMajors.length - 1) {
          responseContent += '\n';
        }
      });

      return res.status(200).send(responseContent);
    } catch (error) {
      return res.status(500).send('Failed to load the database');
    }
  }
}

module.exports = StudentsController;
