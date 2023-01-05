'use strict';

//String Method Practice
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  let [info, departingFrom, arrivingTo, time] = flight.split(';');
  let output = `${info.includes('Delayed') ? `🔴 ` : ``}${info
    .replaceAll('_', ' ')
    .trim()} from ${getCode(departingFrom)} to ${getCode(
    arrivingTo
  )} (${time.replace(':', 'h')})`;
  console.log(output.padStart(44));
}
//Goal is to look like this
/*
    Delayed Departure from FAO to TXL (11h25)
    Arrival from BRU to FAO (11h45)
    Deyalyed Arrival from HEL to FAO (12h05)
    Departure from FAO to LIS (12h30)
*/

const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log('a+very+nice+string'.split('+')); // array a,very,nice,string
console.log('Julie Mck'.split(' ')); //array Julie,Mck

const [firstName, lastName] = 'Julie McKenna'.split(' ');
const newName = ['Mrs.', firstName, lastName.toUpperCase].join(' ');
console.log(newName);

const capitalizedName = name => {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    //namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitalizedName('jesica ann smith davis');

//padding
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+')); //+++++++++++++++Jonas++++++++++

//masking credit card - get last 4 and change the otehrs to *
const maskedCreditCard = number => {
  const str = number + ''; //converts to empty string
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskedCreditCard(1234566789012));
console.log(maskedCreditCard(16789012));
console.log(maskedCreditCard(19012));

//repeat
const message2 = 'Bad weather... All Departures Dekyaed...';
console.log(message2.repeat(5));

const planesInLine = n =>
  console.log(`There are ${n} planes in line. `.repeat(n));

planesInLine(5);
planesInLine(2);

//Lecture 2
console.log(airline.toUpperCase());
console.log(airline.toLocaleLowerCase());

// Fixing capitalization
const passanger = 'jOnAs';
const passangerLowercase = passanger.toLowerCase();
const passangerCorrect =
  passangerLowercase[0].toUpperCase() + passangerLowercase.slice(1);
console.log(passangerCorrect);

//Comparing email
const email = 'hello@jonas.io';
const loginEmail = '   Hello@Jonas.Io \n';

// const emailLower = loginEmail.toLowerCase();
// const trimmedEmail = emailLower.trim();
// console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

//replacing
const priceGB = '288,97E';
const priceUS = priceGB.replace('E', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to baording door 23. Boarding door 23!';
console.log(announcement.replace('door', 'gate')); // only changes the frist one - 'All passengers come to baording gate 23. Boarding door 23!'
console.log(announcement.replace(/door/g, 'gate')); // chnages all - 'All passengers come to baording gate 23. Boarding gate 23!'

//booleans
const plane1 = 'Airbus A320neo';
console.log(plane1.includes('A320')); //true
console.log(plane1.includes('Boeing')); //false
console.log(plane1.startsWith('Airb')); // true

if (plane1.startsWith('Airb') && plane1.endsWith('eno')) {
  console.log('Part of the NEW Airbus family');
}

const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else console.log('Have a nice flight');
};

const checkBaggageArrow = items => {
  let baggage = items.toLowerCase();
  baggage.includes('knife') || baggage.includes('gun')
    ? console.log('You are NOT allowed on board')
    : console.log('Have a nice flight');
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggageArrow('Got some snacks and a gun for protection');

//Lecture 1
console.log(plane[0]);
console.log(plane[1]);
console.log('B737'[1]);

console.log(airline.length); //16
console.log('B737'.length); //4

console.log(airline.indexOf('r')); //6
console.log(airline.lastIndexOf('r')); //10
console.log(airline.indexOf('Portugal')); //8
console.log(airline.indexOf('portugal')); //-1 bc not found

console.log(airline.slice(4)); //starts at 4 - Air Portugal
console.log(airline.slice(4, 7)); //Air - only extracts the 6th does not go to the 7th

console.log(airline.slice(0, airline.indexOf(' '))); //gets first word
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //gets last word

console.log(airline.slice(-2)); //gets last two characters - al
console.log(airline.slice(1, -1)); //AP Air Portuga  everything but first and last character

const checkMiddleSeatArrow = seat =>
  seat.slice(-1) === 'B' || seat.slice(-1) === 'E'
    ? console.log('You got the middle seat')
    : console.log('You got lucky');

const checkMiddleSeat = function (seat) {
  //B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat');
  else console.log('You got lucky');
};

checkMiddleSeat('11B');
checkMiddleSeat('10C');

checkMiddleSeatArrow('11B');
checkMiddleSeatArrow('10C');
checkMiddleSeatArrow('3E');
