// Array example
const fruits = ['apple', 'banana', 'mango'];
console.log('Fruits:', fruits);

// Access array values
console.log('First fruit:', fruits[0]);
console.log('Second fruit:', fruits[1]);

// Object example
const student = {
  name: 'Aarav',
  age: 21,
  city: 'Delhi',
};
console.log('Student object:', student);

// Access object values
console.log('Student name:', student.name);
console.log('Student age:', student.age);

// Array of objects
const students = [
  { name: 'Priya', age: 20 },
  { name: 'Rahul', age: 22 },
  { name: 'Ananya', age: 23 },
];
console.log('Students list:', students);

// Destructuring array
const [firstFruit, secondFruit, thirdFruit] = fruits;
console.log('Destructured first fruit:', firstFruit);
console.log('Destructured second fruit:', secondFruit);
console.log('Destructured third fruit:', thirdFruit);

// Destructuring object
const { name, age, city } = student;
console.log('Destructured name:', name);
console.log('Destructured age:', age);
console.log('Destructured city:', city);

// Destructuring inside a function
function showStudent({ name, age }) {
  console.log('Function destructuring:', name, age);
}

showStudent(student);

// Object with nested array
const school = {
  name: 'City School',
  students: ['Aarav', 'Priya', 'Rahul'],
};

const { students: schoolStudents } = school;
console.log('School students:', schoolStudents);
