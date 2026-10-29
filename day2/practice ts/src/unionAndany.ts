let subs: number | string = "Roopesh22";
let apiRequestStatus: 'pending' | 'success' | 'failure' = 'pending';

console.log(subs);
console.log(apiRequestStatus);

function printValue(value: string | number) {
  console.log(value);
}

printValue("Hello");
printValue(123);
