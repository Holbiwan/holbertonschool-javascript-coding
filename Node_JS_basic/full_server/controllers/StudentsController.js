import { readDatabase } from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const databaseFile = process.argv[2] || '';
      const students = await readDatabase(databaseFile);

      if (!students || students.length === 0) {
        return res.status(500).send('Failed to load the database');
      }

      const majorCounts = new Map();

      students.CS.forEach(() => {
        majorCounts.set('CS', (majorCounts.get('CS') || 0) + 1);
      });

      students.SWE.forEach(() => {
        majorCounts.set('SWE', (majorCounts.get('SWE') || 0) + 1);
      });

      let responseContent = 'List of students by major\n';

      majorCounts.forEach((count, major) => {
        const firstNames = students[major].join(', ');
        responseContent += `Students in ${major}: ${count}. Names: ${firstNames}\n`;
      });

      return res.status(200).send(responseContent);
    } catch (error) {
      return res.status(500).send('Failed to load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    try {
      const { major } = req.params;

      if (major !== 'CS' && major !== 'SWE') {
        return res.status(500).send('Major parameter must be CS or SWE');
      }

      const databaseFile = process.argv[2] || '';
      const students = await readDatabase(databaseFile);

      if (!students || students.length === 0) {
        return res.status(500).send('Failed to load the database');
      }

      const firstNames = students[major].join(', ');
      return res.status(200).send(`List: ${firstNames}`);
    } catch (error) {
      return res.status(500).send('Failed to load the database');
    }
  }
}

module.exports = StudentsController;
export default StudentsController;
