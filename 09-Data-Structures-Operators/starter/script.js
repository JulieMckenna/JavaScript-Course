'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function (
    {
      starterIndex = 1,
      mainIndex = 0,
      time = `20:00`,
      address,
    } /*imedate destructoring of the obj passed in*/
  ) {
    console.log(
      `Order recieved. ${this.starterMenu[starterIndex]} and 
      ${this.mainMenu[mainIndex]} will be delievred to ${address} at ${time}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your pasta with ${ing1}, ${ing2} and ${ing3}`);
  },
  orderPizza: function (mainIngredient, ...otherIngredidents) {
    console.log(
      `Ordered Pizza. Main ingredient: ${mainIngredient} and the rest of the ingredients are: ${otherIngredidents}`
    );
    console.log(mainIngredient);
    console.log(otherIngredidents);
  },
};
console.log('------- Local Assignment Operators -------');
const rest1 = {
  name: 'Capri',
  numGuests: 0,
};

const rest2 = {
  name: 'La Pizza',
  owner: 'Julie',
};

//assign all resturants a number of guests
//OR
//rest1.numGuests = rest1.numGuests || 10;
//rest2.numGuests ||= 10; //same as above assigns varaible if falsie/doesn't exist
//^ this won't work if the value is 0

//Nullish - this accounts for a 0
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

//AND assignemnt
//rest1.owner = rest1.owner && '<ANYOMONUS>'; //adds the owner as undefined
rest1.owner &&= '<ANYOMONUS>'; //does not add an owner
rest2.owner &&= '<ANYOMONUS>'; // sets to anymonus since there is an owner (thruthie)

console.log(rest1);
console.log(rest2);

console.log('------- Nullish -------');
restaurant.numGuests = 0; //will not work if 0
const guests3 = restaurant.numGuests ? restaurant.numGuests : 10; //checks if resturant has the property saves it if it does or assigns it 10
console.log(guests3); //returns 10

//Nullish: null and undefined (NOT 0 or '')
const guestsCorrect = restaurant.numGuests ?? 10;
console.log(guestsCorrect);

//short circuiting && and ||
console.log('------- OR -------');
//if 1st value is thruthie value it will not look at the next one and return that
console.log(3 || 'Julie'); //returns 3
console.log('' || 'Julie'); //returns Julie
console.log(true || 0); //returns 0
console.log(undefined || null); //returns null
console.log(undefined || 0 || '' || 'Hello' || 23 || null); //returns Hello

const guests = restaurant.numGuests ? restaurant.numGuests : 10; //checks if resturant has the property saves it if it does or assigns it 10
console.log(guests); //returns 10 since not defined

restaurant.numGuests = 23; //will not work if 0
const guests2 = restaurant.numGuests ? restaurant.numGuests : 10; //checks if resturant has the property saves it if it does or assigns it 10
console.log(guests2); //returns 23

console.log('------- AND -------');
console.log(0 && 'Julie'); // returns 0
console.log(7 && 'Julie'); //returns Julie since first value is thruthie

console.log('hello' && 23 && null && 'julie'); //returns null - the nulls shorts it out to false

//practical ex
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushroom', 'spianch');
}
restaurant.orderPizza && restaurant.orderPizza('mush', 'spinach'); //if the method exists will continue otherwise cancels out

console.log('------- REST Pattern -------');

//rest pattern & parameters
//spead since ... on the RIGHT side on the =
const arr3 = [1, 2, ...[3, 4]];

//rest since ... on the LEFT side of the =
const [k, l, ...others] = [1, 2, 3, 4, 5, 6];
console.log(k, l, others); //others becomes array of the rest of the values

const [pizza, , rissotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, rissotto, otherFood); // must be the last item gets everything after (does not get skipped values from earlier)

//Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

//2 functions
const add = function (...numbers) {
  //packs then into an array
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};
add(2, 3);
add(5, 3, 4, 2);
add(8, 7, 3, 1, 2, 5);

const t = [10, 23, 4];
add(...t);

restaurant.orderPizza('mushrooms', 'onion', 'peppers', 'sausage');

restaurant.orderPizza('mushrooms');

//the spread operator works on iteratbles (arrays, maps, sets, NOT objects)
const arr2 = [7, 8, 9];
const badNewArr = [1, 2, arr2[0], arr2[1], arr2[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr2]; //gets all the elements from the arr
console.log(newArr);
console.log(...newArr); //prints indiviual

//exoand array
const newMenu = [...restaurant.mainMenu, 'Gnocci']; // new array
console.log(newMenu);

//copy array
const mainMenuCopy = [...restaurant.mainMenu];

//join the 2 menus
const menuJoined = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menuJoined);

const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...letters);
console.log(...str);
//console.log(`${...str} does not work`);

//use order pasta function
/*const ingredients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt('Ingredient 2?'),
  prompt('Ingredient 3?'),
];*/
const ingredients = ['a', 'b', 'c'];
console.log(ingredients);

restaurant.orderPasta(...ingredients); // same as - restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

//objects
const newResturant = { yearFounded: 1900, ...restaurant, founder: 'Guisepee' };
console.log(newResturant);

const newResturantCopy = { ...newResturant };
newResturantCopy.name = 'New copy';
console.log(newResturantCopy.name);
console.log(newResturant.name); //this is still the same name not changed

restaurant.orderDelivery({
  time: '22:30',
  address: '3 Vista Road',
  mainIndex: 2,
  starterIndex: 2,
});

//using default values
restaurant.orderDelivery({
  address: '20 Try Road',
  mainIndex: 1,
});
//destructor objects
const { name, openingHours, categories } = restaurant; //has to be the name of the properties
console.log(name, openingHours, categories);

//save as differnt name
const {
  name: resturantName,
  openingHours: hours,
  categories: tags,
} = restaurant; //has to be the name of the properties
console.log(resturantName, hours, tags);

//default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters); //gets an empty array (since menu does not exist in the object) and then the starters

//mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj); //need to wrap to change these values from above
console.log(a, b);

//nested objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

//destructoring arrays
const arr = [2, 3, 4];
/*
const a = arr[0];
const b = arr[1];
const c = arr[2];
*/

const [x, y, z] = arr; //destrcutuing assignment
console.log(x, y, z); //2, 3, 4

let [main, secondary] = restaurant.categories; //gets
console.log(main, secondary);

//to skip a value in the array
//const [first, , second] = restaurant.categories; - gets 1st and 3rd

/*//to swap values w/ a temp value
const temp = main;
main = secondary;
secondary = temp;
*/

[main, secondary] = [secondary, main]; //use destructoring

//get 2 varaibales form 1 fucntion call
const [starter, mainCourse] = restaurant.order(2, 0); // order
console.log(starter, mainCourse);

const nested = [2, 4, [5, 6]];
const [i, , j] = nested; //2, [5,6]

const [e, , [f, g]] = nested;
console.log(e, f, g); // 2, 5, 6

//defult values - like a backup
const [p = 1, q = 1, r = 1] = [8, 9]; //trying to destructor when you dont know the length of the array
