// controllers/studentController.js
// controllers/studentController.js
const students = require('../data/students');

// Auto-increment ID for demo (in-memory)
let currentId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;

exports.getAllStudents = (req, res) => {
  res.json(students);
};

exports.getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
};

exports.createStudent = (req, res) => {
  const { name, grade, age } = req.body;

  if (!name || !grade || !age) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newStudent = {
    id: currentId++,
    name,
    grade,
    age
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
};

exports.updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }

  const { name, grade, age } = req.body;

  if (name) student.name = name;
  if (grade) student.grade = grade;
  if (age) student.age = age;

  res.json(student);
};

exports.deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  const deletedStudent = students.splice(index, 1);
  res.json({ message: 'Student deleted', student: deletedStudent[0] });
};
