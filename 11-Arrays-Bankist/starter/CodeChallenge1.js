/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! 
    So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult 
    ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy🐶")
4. Run the function for both test data sets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3] 
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
*/

//1 remove the cats
const checkDogs = (dogsJulia, dogsKate) => {
  const dogsJuliaCorrect = dogsJulia.slice();
  //dogsJuliaCorrect = dogsJulia.slice(1,3); would also work
  dogsJuliaCorrect.splice(0, 1); //removes first 1
  dogsJuliaCorrect.splice(-2); //removes last 2

  //2
  const allDogs = [...dogsJuliaCorrect, ...dogsKate];
  console.log(allDogs);

  //3
  allDogs.forEach(function (dog, i, arr) {
    console.log(
      `Dog number ${i + 1}: is an ${
        dog >= 3 ? 'adult' : 'puppy'
      } and is ${dog} years old ${dog >= 3 ? '' : '🐶'}`
    );
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

/*
Code Challenge 2
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
Your tasks:
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula:
    if the dog is <= 2 years old, humanAge = 2 * dogAge. 
    If the dog is > 2 years old, humanAge = 16 + dogAge * 4
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test data sets
Test data:
    § Data1:[5,2,4,1,15,8,3] 
    § Data2:[16,6,10,5,6,1,4]
*/

const calcAverageHumanAge = dogAges => {
  console.log(`Dog ages ${dogAges}`);

  //1 Calc age of dogs in human years
  const dogsHumanAge = dogAges.map(dogAge =>
    dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
  );
  console.log(`Human age of dogs ${dogsHumanAge}`);

  //2 Filter to only adult dogs (less than 18 human years)
  const dogFiltered = dogsHumanAge.filter(age => age >= 18);
  console.log(`Filtered ages ${dogFiltered}`);

  //3 Average
  const dogAverage =
    dogFiltered.reduce((acc, age) => acc + age, 0) / dogFiltered.length;
  /* could also do this
    const dogAverage =
    dogFiltered.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
    */
  console.log(`Average age of adult dog: ${dogAverage}`);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

/*
Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time as an arrow function, and using chaining!
Test data:
    § Data1:[5,2,4,1,15,8,3] 
    § Data2:[16,6,10,5,6,1,4]
*/
const calcAverageHumanAgeArrow = dogAges =>
  dogAges
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

const avg1 = calcAverageHumanAgeArrow([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAgeArrow([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
