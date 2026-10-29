type Demo = {
    name: string;
    age: number;
};

function isDemo(obj: any): obj is Demo {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.name === 'string' &&
        typeof obj.age === 'number'
    );
}

const person: any = { name: 'Roopesh', age: 22 };

if (isDemo(person)) {
    console.log(person.name, person.age); 
}