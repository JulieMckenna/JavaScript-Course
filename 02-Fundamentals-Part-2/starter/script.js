'use strict'; //helps catch bugs/errors - doesnt allow it to 'silently' fail & reserves words like `interface`

/*
lecture - using strict
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log(`I can drive :D`);
*/

//LECTURE: Functions
/*
1. Write a function called 'describeCountry' which takes three parameters:
'country', 'population' and 'capitalCity'. Based on this input, the
function returns a string with this format: 'Finland has 6 million people and its
capital city is Helsinki'
2. Call this function 3 times, with input data for 3 different countries.Store the
returned values in 3 different variables, and log them to the console
*/
function describeCountry(country, population, capitalCity) {
    console.log(`${country} has ${population} million people and its capital city is ${capitalCity}.`);
}
describeCountry("Finland", 3, "Helsinki");
describeCountry("USA", 100, "DC");
describeCountry("Netherlands", 10, "Amsterdam");


//LECTURE: Function Declarations vs.Expressions
/*
1. The world population is 7900 million people. Create a function declaration
called 'percentageOfWorld1' which receives a 'population' value, and
returns the percentage of the world population that the given population
represents.For example, China has 1441 million people, so it's about 18.2% of
the world population
2. To calculate the percentage, divide the given 'population' value by 7900
and then multiply by 100
3. Call 'percentageOfWorld1' for 3 populations of countries of your choice,
    store the results into variables, and log them to the console
4. Create a function expression which does the exact same thing, called
'percentageOfWorld2', and also call it with 3 country populations(can be
the same populations)
*/
function percentageOfWorld1(population) {
    return (population / 7900) * 100;
}
const chinaPopulation = percentageOfWorld1(1441);
const worldPopulation = percentageOfWorld1(7900);
const randPopulation = percentageOfWorld1(790);
console.log(chinaPopulation, worldPopulation, randPopulation);

const percentageOfWorld2 = function (population) {
    return (population / 7900) * 100;
}
const chinaPopulation2 = percentageOfWorld2(1441);
const worldPopulation2 = percentageOfWorld2(7900);
const randPopulation2 = percentageOfWorld2(790);
console.log(chinaPopulation2, worldPopulation2, randPopulation2);

//LECTURE: Arrow Functions
/*
1. Recreate the last assignment, but this time create an arrow function called
'percentageOfWorld3
*/
const percentageOfWorld3 = population => (population / 7900) * 100;
const chinaPopulation3 = percentageOfWorld3(1441);
const worldPopulation3 = percentageOfWorld3(7900);
const randPopulation3 = percentageOfWorld3(790);
console.log(chinaPopulation3, worldPopulation3, randPopulation3);

//ex multi line arrow function
const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2022 - birthYear;
    const retirement = 65 - age;
    return `${firstName} retires in ${retirement} years.`;
}
console.log(yearsUntilRetirement(1998, 'Julie'));

//LECTURE: Functions Calling Other Functions
/*1. Create a function called 'describePopulation'.Use the function type you
like the most.This function takes in two arguments: 'country' and
'population', and returns a string like this: 'China has 1441 million people,
which is about 18.2 % of the world.'
2. To calculate the percentage, 'describePopulation' call the
'percentageOfWorld1' you created earlier
3. Call 'describePopulation' with data for 3 countries of your choice
*/
const describePopulation = (country, population) => `${country} has ${population} million people which is about ${percentageOfWorld1(population)}% of the world.\n`;
const desPopFinland = describePopulation("Finland", 3);
const desPopUSA = describePopulation("USA", 100);
const desPopNetherlands = describePopulation("Netherlands", 10);
console.log(desPopFinland, desPopUSA, desPopNetherlands);

//LECTURE: Introduction to Arrays
/*1. Create an array containing 4 population values of 4 countries of your choice.
You may use the values you have been using previously.Store this array into a
variable called 'populations'
2. Log to the console whether the array has 4 elements or not(true or false)
3. Create an array called 'percentages' containing the percentages of the
world population for these 4 population values.Use the function
'percentageOfWorld1' that you created earlier to compute the 4
percentage values
*/
const populations = new Array(10, 50, 7900, 400);
console.log(populations.length == 4);

const percenatges = new Array(percentageOfWorld1(populations[0]), percentageOfWorld1(populations[1]), percentageOfWorld1(populations[2]), percentageOfWorld1(populations[3]));
console.log(populations, percenatges);

//LECTURE: Basic Array Operations(Methods)
/*1. Create an array containing all the neighbouring countries of a country of your
choice.Choose a country which has at least 2 or 3 neighbours.Store the array
into a variable called 'neighbours'
2. At some point, a new country called 'Utopia' is created in the neighbourhood of
your selected country.So add it to the end of the 'neighbours' array
3. Unfortunately, after some time, the new country is dissolved.So remove it from
the end of the array
4. If the 'neighbours' array does not include the country ‘Germany’, log to the
console: 'Probably not a central European country :D'
5. Change the name of one of your neighbouring countries.To do that, find the
index of the country in the 'neighbours' array, and then use that index to
change the array at that index position.For example, you can search for
'Sweden' in the array, and then replace it with 'Republic of Sweden'.
*/
let neighbours = new Array('Mexico', 'Canada', 'Panama');
console.log(neighbours);
neighbours.push('Utopia');
console.log(neighbours);
neighbours.pop();
console.log(neighbours);
if (!neighbours.includes("Germany"))
    console.log("Probably not a central European country :D");

neighbours[neighbours.indexOf('Canada')] = 'Republic of Canada';
console.log(neighbours);

//LECTURE: Introduction to Objects
/*1. Create an object called 'myCountry' for a country of your choice, containing
properties 'country', 'capital', 'language', 'population' and
'neighbours'(an array like we used in previous assignments)
*/
const myCountry = {
    country: "USA",
    capital: "DC",
    langugae: "English",
    population: 1000,
    neighbours: ['Canada', 'Mexico']
};

//LECTURE: Dot vs.Bracket Notation
/*
1. Using the object from the previous assignment, log a string like this to the
console: 'Finland has 6 million finnish-speaking people, 3 neighbouring countries
and a capital called Helsinki.'
2. Increase the country's population by two million using dot notation, and then
decrease it by two million using brackets notation.
*/
console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.langugae}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}.`);
myCountry.population += 2;
console.log(myCountry.population);
myCountry['population'] -= 2;
console.log(myCountry['population']);

//LECTURE: Object Methods
/*1. Add a method called 'describe' to the 'myCountry' object.This method
will log a string to the console, similar to the string logged in the previous
assignment, but this time using the 'this' keyword.
2. Call the 'describe' method
3. Add a method called 'checkIsland' to the 'myCountry' object.This
method will set a new property on the object, called 'isIsland'.
'isIsland' will be true if there are no neighbouring countries, and false if
there are.Use the ternary operator to set the property.
*/
const myCountry2 = {
    country: "USA",
    capital: "DC",
    langugae: "English",
    population: 1000,
    neighbours: ['Canada', 'Mexico'],
    describe: function () {
        console.log(`${this.country} has ${this.population} million ${this.langugae}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}.`);
    },
    checkIsland: function () {
        this.isIsland = this.neighbours.length === 0 ? true : false;
    }
};
myCountry2.describe();
myCountry2.checkIsland();
console.log(myCountry2);

//LECTURE: Iteration: The for Loop
/*
1. There are elections in your country! In a small town, there are only 50 voters.
Use a for loop to simulate the 50 people voting, by logging a string like this to
the console(for numbers 1 to 50): 'Voter number 1 is currently voting'
LECTURE: Looping Arrays, Breaking and Continuing
1. Let's bring back the 'populations' array from a previous assignment
2. Use a for loop to compute an array called 'percentages2' containing the
percentages of the world population for the 4 population values. Use the
function 'percentageOfWorld1' that you created earlier
3. Confirm that 'percentages2' contains exactly the same values as the
'percentages' array that we created manually in the previous assignment,
and reflect on how much better this solution is
*/

//LECTURE: Looping Backwards and Loops in Loops
/*
1. Store this array of arrays into a variable called 'listOfNeighbours'
[['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden',
'Russia']];
2. Log only the neighbouring countries to the console, one by one, not the entire
arrays. Log a string like 'Neighbour: Canada' for each country
3. You will need a loop inside a loop for this. This is actually a bit tricky, so don't
worry if it's too difficult for you! But you can still try to figure this out anyway �
*/

//LECTURE: The while Loop
/*
1. Recreate the challenge from the lecture 'Looping Arrays, Breaking and Continuing',
but this time using a while loop (call the array 'percentages3')
2. Reflect on what solution you like better for this task: the for loop or the while
loop?
*/