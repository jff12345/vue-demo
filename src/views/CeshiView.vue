<template>
    <div>
      
    </div>
</template>


<script setup>

// async function myFunction() {
//   const arr = [1, 2, 3];

//   for (const item of arr) {
//     await myAsyncFunction(item);
//   }
// }

// async function myAsyncFunction(param) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log(param);
//       resolve();
//     }, 1000);
//   });
// }

// myFunction();










function myFunction() {
  const arr = [1, 2, 3];

  arr.reduce((promise, item) => {
    return promise.then(() => myPromiseFunction(item));
  }, Promise.resolve());
}

function myPromiseFunction(param) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(param);
      resolve();
    }, 1000);
  });
}

myFunction();













</script>

<style scoped></style>