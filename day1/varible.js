// JavaScript Variables Examples

// var: can be changed and redeclared
var name1 = 'Ayesha';
console.log('var example:', name1);

// let: can be changed later
let age = 21;
age = 22;
console.log('let example:', age);

// const: cannot be changed once assigned
const city = 'delhi';
console.log('const example:', city);

// const object can still update its properties
const student = {
  name: 'jay',
  age: 20,
};
student.age = 21;
console.log('const object:', student);

// var can be redeclared
var x = 5;
var x = 10;
console.log('var redeclare:', x);

// let cannot be redeclared in the same scope
let y = 7;
console.log('let value:', y);

// const cannot be reassigned
const z = 50;
console.log('const value:', z);
