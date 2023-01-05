'use strict';

//----------------------------------------------------------------------------------------------
//Closures
const secureBooking = function () {
  let passangerCount = 0; //can't be accessed form the outsude

  return function () {
    passangerCount++;
    console.log(`${passangerCount} passangers`);
  };
};

//A fucntion has access to the VE of the execution context in which it was created
//Closure - Variable Enviornment (VE) attached to the fucntion, exactly as it was at the time and place the function was created
//A closure makes sure that a fucntion dioesn't loose connection to variables that exsisted at the functions birth place
//A closure is like a backpack that a function carries around wherever it goes.
//    This backpack has all the variables that were present in the enviornment where the function was created
//Has priority over scope chain

const booker = secureBooking(); ///closure - alwasy have access to this variable
booker();
booker();
booker(); //increments up to 3 - for each time it is called

//to look at the variables of the function
console.dir(booker); //can see the closure prooperty that CAN NOT be accessed via code

//----------------------------------------------------------------------------------------------
//More closure examples
let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = () => {
  const b = 77;
  f = function () {
    console.log(b * 2);
  };
};

g(); //23
f(); //46 - this works

//reassigning f
h(); //154
//now f does not contain 'a' now

//reassigning f
f(); //46
//now f does not contain 'b' now

// Ex 2
const boardPassangers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passangers`);
    console.log(`There are 3 groups each with ${perGroup} passangers`);
  }, wait * 1000); //prints later

  console.log(`We will start boarding in ${wait} seconds.`); //prints immedidately
};
const perGroup = 1000; //gets overridden by the perGroup in the first line of the fucntion
boardPassangers(180, 3);

//----------------------------------------------------------------------------------------------
//immediately invoked fucntion expressions - only run it once - use this
const runOnce = function () {
  console.log(`This will never run again`);
};
runOnce();

//IFEE
(function () {
  console.log(`This will only run once`);
  const isPrivate = 23;
})();
//console.log(isPrivate); //would return an error

//Arrow function way
(() => console.log(`This will only run once`))();

{
  //creates new scope and data privacy
  const isPrivate = 23;
  var notPrivate = 46;
}
//console.log(isPrivate); // still an error
console.log(notPrivate); //this can be seen and returned

//----------------------------------------------------------------------------------------------
//Call and apply methods (this keyword)
const lufthansa = {
  airline: 'luthansa',
  iataCode: 'LH',
  bookings: [],
  //book: function() {} - old syntax
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(345, 'Julie');
lufthansa.book(678, 'Jonas');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

//book(23, 'Sara'); //wont work

//Call Method
book.call(eurowings, 23, 'Sarah'); //this will work
console.log(eurowings);

book.call(lufthansa, 345, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};
book.call(swiss, 45, 'Mary Cooper');
console.log(swiss);

//Apply Method - takes array (not used a lot)
const flightData = [78, 'george Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData); //used more often
console.log(swiss);

//Bind method
const bookEW = book.bind(eurowings); // creates new function where this is eurowings
bookEW(23, 'Steven W');
console.log(eurowings);

const bookLH = book.bind(lufthansa); // creates new function where this is lufthansa
const bookLX = book.bind(swiss); // creates new function where this is swiss

const bookEW23 = book.bind(eurowings, 23); //this only needs the name
bookEW23('John Williams');
bookEW23('John C');
console.log(eurowings);

//very useful with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

//document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane); //this is pointing to the button - nan
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); //this is pointing to lufthansa, bind to that

//partial application - creates brand new application instead of setting a default
const addTax = (rate, value) => value + value * rate;
console.log(`Added Tax: ${addTax(0.1, 20)}`);

const addVAT = addTax.bind(null, 0.23); //use a certain tax value a lot
//value + value * 0.23;

console.log(addVAT(100));

//Challange
const addTaxRate = rate => {
  return function (value) {
    return value + value * rate;
  };
};
const addTax25 = addTaxRate(0.25);
console.log(addTax25(100));

//----------------------------------------------------------------------------------------------
//functions returning functions
const greet = greeting => {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

//Challange
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
greetArrow('Hi')('jonas'); //Hi jonas

const greeterHey = greet('Hey');
greeterHey('Julie');
greeterHey('Jonas'); //hey Jonas

greet('hello')('Jonas'); //hello Jonas

//functions accepting callback functions
const oneWord = str => str.replaceAll(' ', '').toLowerCase();
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//higher order function - THIS CAN BE SUPER USEFUL
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};

transformer('Javascript is the best', upperFirstWord);
transformer('Javascript is the best', oneWord);

const high5 = () => console.log('👋');
document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5); //for each of the call the method - would be 3

//----------------------------------------------------------------------------------------------
// Why use callbacks
/*
    allows us to break out the code
    allows us to create abstraction
*/

//First class fucntions
/*
Store functions in varaibles or properties
    const add = (a,b) => a+b;
    const counter = {
        value = 23,
        inc: function() {this.value++;}
    }
Pass functions as arguments to OTHER functions - i.e event listeners
    const greet() = () => console.log('Hey there');
    btnClose.addEventListener('click', greet)
Retun fucntions FROM functions, call methods on functions
    counter.inc.bind(someOtherObject);
    */

//higher order functions
/*
1. Function that recieves another function 
    const greet() = () => console.log('Hey there');
    btnClose.addEventListener('click', greet)
            Higher order func           callback function
2. Function that returns a new function
    function count(){ <- higher order function
        let counter = 0;
        return function(){ <- returned function 
            counter++;
        };
    }

*/

//----------------------------------------------------------------------------------------------
//How passaing values work: Value v. Reference
const flight = 'LH234';
const julie = {
  name: 'Julie McKenna',
  passport: 23456789,
};

const checkIn = function (flightNum, passanger) {
  flightNum = 'LH999';
  passanger.name = 'Mrs. ' + passanger.name;

  if (passanger.passport === 23456789) {
    alert('Checked in');
  } else {
    alert('Wrong passport');
  }
};

//checkIn(flight, julie);
console.log(flight); //does not get changed since passed the value - still LH234
console.log(julie); //doexs get changed since passed the object/refernce - Mrs. Julie McKenna

const newPassport = person => {
  person.passport = Math.random(Math.random() * 10000000);
};
newPassport(julie); //changes the passport vallue since by refernce
//checkIn(flight, julie); //will say wrong passport since it is changed above

//JS does not have pass by refernce, object is passed which is a refernce to the memory location

//default paramters
const bookings = [];
const createBooking = function (
  flightNum,
  numPassangers = 1,
  price = 199 * numPassangers
) {
  /*
   *ES5 way
   numPassanger = numPassanger || = 1
   */
  const booking = {
    flightNum,
    numPassangers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
createBooking('LH123', undefined, 300); //how to skip default parameter
