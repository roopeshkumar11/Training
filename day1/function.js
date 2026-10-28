// JavaScript Functions - Simplified Examples

// 1. Function Declaration
function add(a, b) {
  return a + b;
}

console.log('Function Declaration:', add(5, 3));

// 2. Function Expression
const subtract = function (a, b) {
  return a - b;
};

console.log('Function Expression:', subtract(10, 4));

// 3. Arrow Function
const multiply = (a, b) => a * b;
console.log('Arrow Function:', multiply(3, 4));


// 5. Named Function Expression
const namedFn = function greetUser() {
  return 'This is a named function expression';
};

console.log('Named Function Expression:', namedFn());

// 6. IIFE (Immediately Invoked Function Expression)
(function () {
  console.log('IIFE: This runs immediately');
})();

// 7. IIFE with parameters
(function (name) {
  console.log('IIFE with parameter:', 'Hello ' + name);
})('Ayesha');
