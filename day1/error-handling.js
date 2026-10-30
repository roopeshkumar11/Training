// Error handling in JavaScript

// 1. try/catch example
try {
  const result = 10 / 0;
  console.log('Result:', result);
} catch (error) {
  console.log('Error caught:', error.message);
}

// 2. try/catch with wrong variable
try {
  console.log(name);
} catch (error) {
  console.log('Variable error:', error.message);
}

// 3. Promise error handling
const loadData = () => {
  return new Promise((resolve, reject) => {
    const success = false;

    if (success) {
      resolve('Data loaded successfully');
    } else {
      reject('Something went wrong');
    }
  });
};

loadData()
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.log('Promise error:', error);
  });

// 4. Async/Await with try/catch
async function getUser() {
  try {
    const data = await loadData();
    console.log('Async success:', data);
  } catch (error) {
    console.log('Async error:', error);
  }
}

getUser();

// 5. Simple example of finally
try {
  console.log('Start');
  throw new Error('Example error');
} catch (error) {
  console.log('Caught:', error.message);
} finally {
  console.log('This always runs');
}
