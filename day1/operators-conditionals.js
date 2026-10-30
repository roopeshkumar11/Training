// JavaScript Operators and Conditional Statements

// Arithmetic operators
let a = 10;
let b = 5;
console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);

// Comparison operators
console.log(a == b);
console.log(a != b);
console.log(a > b);
console.log(a < b);
console.log(a >= b);
console.log(a <= b);

// Logical operators
const x = true;
const y = false;
console.log(x && y);
console.log(x || y);
console.log(!x);

// Assignment operators
let score = 20;
score += 5;
console.log(score);

// Conditional statements
const age = 18;

if (age >= 18) {
  console.log('You are an adult.');
} else {
  console.log('You are not an adult.');
}

// if else if
const marks = 75;

if (marks >= 90) {
  console.log('Grade: A');
} else if (marks >= 75) {
  console.log('Grade: B');
} else if (marks >= 60) {
  console.log('Grade: C');
} else {
  console.log('Grade: Fail');
}

// Switch statement
const day = 2;
let dayName = '';

switch (day) {
  case 1:
    dayName = 'Monday';
    break;
  case 2:
    dayName = 'Tuesday';
    break;
  case 3:
    dayName = 'Wednesday';
    break;
  default:
    dayName = 'Other day';
}

console.log(dayName);

// Ternary operator
const isLoggedIn = true;
const message = isLoggedIn ? 'Welcome back' : 'Please login';
console.log(message);
