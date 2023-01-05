'use strict';

//Sets
const ordersSets = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Rissotto',
  'Pasta',
  'Pizza',
]); //will remove all the duplicates
console.log(ordersSets);
console.log(new Set('Jonas'));
console.log(ordersSets.size); //3
console.log(ordersSets.has('Pizza')); //true
console.log(ordersSets.has('Bread')); //false
ordersSets.add('Garlic Bread');
ordersSets.add('Garlic Bread'); //only adds it once
ordersSets.delete('Rissotto'); //removes
console.log(ordersSets);
//No indexes and no way to get data out of the set - only tells you if its in or not
//ordersSets.clear() //removes everything

for (const order of ordersSets) console.log(order);

//Example
const staff = [`Waiter`, 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = new Set(staff);
console.log(staffUnique);
const staffUniqueArray = [...new Set(staff)]; //gets the unqiue positions and store into an array
console.log(new Set(staff).size); //number of unqiue positions

//Map
const rest = new Map(); //easiest way is to create the empty map
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy'); //returns the updated map - good for chaining
console.log(rest.set(2, 'Libson, Portugal'));

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('closed'))); //will say it is open

console.log(rest.has('categories'));
rest.delete(2);
console.log(rest);
console.log(rest.size); //7
//rest.clear(); //clears the map

//use array/opbject as map key
rest.set([1, 2], 'Test'); //can not get the value here since looking at memeory space
const arr = [1, 2];
rest.set(arr, 'Test');
rest.set(document.querySelector('h1'), 'heading'); //from the webpage itself
console.log(rest.get(arr)); //this will work to get the value `Test`
console.log(rest);

const question = new Map([
  ['question', 'What is teh best programmiong language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['Correct', 3],
  [true, 'Correct!'],
  [false, 'Try Again!'],
]);

console.log(question);

//convert objects to maps
/*const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);*/

//quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
//const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);

//either way works
answer === question.get('Correct')
  ? console.log(question.get(true))
  : console.log(question.get(false));

console.log(question.get(answer === question.get('Correct')));

//convert map to array
console.log(...question);
console.log(...question.keys());
console.log(...question.values());
