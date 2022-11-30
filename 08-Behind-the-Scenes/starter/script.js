'use strict';

function calcAge(birthYear) {
  const age = 2022 - birthYear;

  function printAge() {
    let output = `You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      //creating new varaible with same name
      const firstName = 'Julie 2';
      //reassigning variable
      output = 'NEW OUTPUT';
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    //console.log(str); out of scope
    //console.log(add(2, 3)); out of scope
    console.log(millenial); //in scope
  }
  printAge();
  return age;
}

const firstName = 'Julie';
calcAge(1998);

//Temporal Dead zone

//variables
console.log(me);
//console.log(job); issues
//console.log(year); issues

var me = 'Julie';
let job = 'Engineer';
const year = 1998;

//functions
console.log(addDecl(2, 3)); //works
//console.log(addExpr(2,3)); does not Work
//console.log(addArrow(2,3)); does not work

function addDecl(a, b) {
  return a + b;
}
const addExpr = function (a, b) {
  return a + b;
};
var addArrow = (a, b) => a + b;

//example
if (!numProducts) deleteShoppingCart(); //will delete since var is not defined yet (when usuing var)

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products are deleted!');
}

var x = 1; //creates property on window object
let y = 2; //does not create property on window object
const z = 3; //does not create property on window object

//This keyword
console.log(this);

const calcAge2 = function (birthYear) {
  console.log(2022 - birthYear);
  console.log(this);
};
calcAge2(1999); // undefined

const calcAgeArrow = birthYear => {
  console.log(2022 - birthYear);
  console.log(this);
};
calcAgeArrow(1992); // shows window bc uses lexial this (which is window bc strict mode)

const julie = {
  year: 1998,
  calcAge: function () {
    console.log(this);
    console.log(2022 - this.year);
  },
};
julie.calcAge(); // will show julie (1998)

const matilda = {
  year: 2017,
};

matilda.calcAge = julie.calcAge; //copies method
matilda.calcAge(); // will give matildas age

const f = julie.calcAge; // we dont have to call this - gets the function
//f(); //this is undefined - not attached ot an object so it wont work

//regular v arrrow functions

const julie2 = {
  year: 1999,
  firstName: 'Julie',
  calcAge: function () {
    console.log(this);
    console.log(2022 - this.year);
    /*
    Solution 1:
    using self to track this to use in a method
    const self = this; //way to track this in functions

    const isMillenial = function () {
      console.log(self.year >= 1981 && self.year <= 1996);
      //        console.log(this.year >= 1981 && this.year <= 1996);
    };*/

    /*Solution 2:
    Using arrow function*/
    const isMillenial = () => {
      console.log(this);
      console.log(self.year >= 1981 && self.year <= 1996);
    };
    isMillenial(); //regualr fucntion call this=undefined
  },

  greet: () => console.log(`Hey ${this.firstName}`), //gets global scope not the object
};

//var firstName = 'Jonas'; if this is commented in then below it will print `hey Jonas` - pulls the scope

julie2.greet(); //name is undefined
julie2.calcAge();

//argument keyword
const addExpr2 = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr2(2, 5);
addExpr2(2, 5, 10); //saves the other arguments does not name them

var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(2, 5, 8); //will get undefiend

//Primitive(num, string, bool, etc) & Objects (arrays, fucntions, etc)
let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const me = {
  name: 'Julie',
  age: 24,
};

const friend = me;
friend.age = 27;

console.log(`Friends:`, friend);
console.log(`Me: `, me); // this also gets the new age of 27 since me and friend both point at the same object in the memory heap (bc its an object)

//primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName); //Davis, Williams

//refernce types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log(
  `Before marriage: ${jessica.lastName}, After marriage: ${marriedJessica.lastName}`
); //Davis, Davis since we dont change the refernce in memory just the value in the heap

//coyping objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'jake'],
};
const jessicaCopy = Object.assign({}, jessica2); //only creates a shallow copy (only in the first level)
jessicaCopy.lastName = 'Davis';
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('Todd');

console.log(`Before marriage: ${jessica2}, After marriage: ${jessicaCopy}`); //both familys are now 4 long since it was a shallow copy (and the arrays both pointing at the same place in the heap)
