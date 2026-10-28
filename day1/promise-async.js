// Promise example
const getUser = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'Aarav', city: 'Delhi' });
    }, 1000);
  });
};

// Using Promise
getUser().then((user) => {
  console.log('User from Promise:', user);
});

// Async/Await example
async function showUser() {
  const user = await getUser();
  console.log('User from async/await:', user);
}

showUser();

// Another simple async example
async function getMessage() {
  const msg = 'Hello from async function';
  return msg;
}

getMessage().then((result) => {
  console.log('Message:', result);
});

// Simple example of waiting
async function loadData() {
  console.log('Loading...');
  const data = await getUser();
  console.log('Data loaded:', data);
}

loadData();
