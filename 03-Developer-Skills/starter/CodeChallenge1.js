//Code Challenge 1

/*
Given an array of forecasted maximum temperatures, the thermometer displays a string with the given temperatures. 
Example: [17, 21, 23] will print "... 17oC in 1 days ... 21oC in 2 days ... 23oC in 3 days ..."
Your tasks:
1. Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console. 
Try it with both test datasets.
2. Use the problem-solving framework: 
    Understand the problem and break it up into sub-problems!

Test data:
§ Data 1: [17, 21, 23]
§ Data2:[12,5,-5,0,4]
*/

// 1) Undertand the problem
// - Array transformed to string, seperated by ...
// - What is X days? Index + 1

// 2) Break down into sub-problems
// - Transfrom array to string
// - Tranform each element to string with oC
// - String needs the day (index +1)
// - Add `...` in between elements

`use strict`;

const printForecast = function (arr) {
  let returnString = ``;
  for (let i = 0; i < arr.length; i++) {
    returnString += `... ${arr[i]}oC in ${i + 1} days `;
  }
  console.log(returnString + `...`);
};

printForecast([17, 21, 23]);
printForecast([12, 5, -5, 0, 4]);
