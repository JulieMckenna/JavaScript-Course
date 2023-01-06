'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//--------------------------------------------------------------------------------------------
//creating dom elements
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  //for each movement create a dom element for it
  movements.forEach(function (mov, i) {
    const movementType = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${movementType}">${
      i + 1
    } ${movementType}</div>
        <div class="movements__value">${mov}</div>
      </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html); //afterbegin adds the next in top so elements would be 3,2,1 like a stack - most recent on top
  });
};
displayMovements(account1.movements); //will need to change for per user loged in
//console.log(containerMovements.innerHTML); shows all the html created from the foreach loop

//Calcualte and Display the Balance
const calcDisplayBalance = movements => {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance} EUR`;
};
calcDisplayBalance(account1.movements); //will need to change per user loged in

//Calc Display Summary
const calcDisplaySummary = movements => {
  //Calc money coming in
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  //calc money coming in
  const outs = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outs)}€`;

  //calc intreset 1.2% on all the depoists
  const interest = movements
    .filter(mov => mov > 0) //gets deposits
    .map(mov => (mov * 1.2) / 100) //gets interest on the deposit values
    .filter(mov => mov >= 1) //only values that are greater than 1
    .reduce((acc, mov) => acc + mov, 0); //adds them all together
  labelSumInterest.textContent = `${interest}€`;
  console.log(incomes, outs, interest);
};
calcDisplaySummary(account1.movements); //chnage to user when loged to

//Create username
const createUserName = user => {
  return user
    .toLowerCase() //gets to lowercase
    .split(' ') //splits to an array each word
    .map(word => word[0]) //gets the first letter of each word
    .join(''); //joins the letters together
};

//add usernames to each of the accounts
const createUserNames = accs => {
  accs.forEach(acc => {
    acc.username = createUserName(acc.owner);
  });
};
createUserNames(accounts);
console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
//key, value
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//--------------------------------------------------------------------------------------------
//Chaning methods
const euroToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0) //gets deposits (above 0)
  .map(mov => mov * euroToUsd) //converts to usd (*1.1)
  .reduce((acc, mov) => acc + mov, 0); //adds them all together
console.log(totalDepositsUSD);

//--------------------------------------------------------------------------------------------
//Data tranasformation: map, filter, reduce
//map (new array) with some operation done to it
console.log(`---- Data transformations: Map ---`);

const movementsUSD = movements.map(function (mov) {
  return mov * euroToUsd;
  //return 23; would make an array the length of the movements array with all values 23
});

const movementsUSDArrow = movements.map(mov => mov * euroToUsd);
console.log(movements);
console.log(movementsUSD);

//does the same thing
const movementsUSDFor = [];
for (const mov of movements) {
  movementsUSDFor.push(mov * euroToUsd);
}
console.log(movementsUSDFor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
//different from foreach, instead of printing each line, return the line and puts it into an array
console.log(movementsDescriptions);

//filter (new array) contains the array elemenets that pass a certaiun condition
console.log(`---- Data transformations: Filter ---`);
const deposits = movements.filter(mov => mov > 0); //gets all values greater than 0
console.log(`Deposits ${deposits}`);

const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(`Withdrawals: ${withdrawals}`);

//reduce (value) puts all elements into a value (i.e add all elements together)
console.log(`---- Data transformations: Reduce ---`);

//accumilator (acc) lile snowball (sum)
const balance = movements.reduce((accumilator, cur, i, arr) => {
  console.log(`Iteration ${i}: ${accumilator}`);
  return accumilator + cur;
}, 0); //this 0 is the starting value of the acc
console.log(balance);

const balanceArrow = movements.reduce(
  (accumilator, cur) => accumilator + cur,
  0
);

let balance2 = 0;
for (const mov of movements) {
  balance2 += mov;
}
console.log(balance2);

//Get max value of array
const maxBalanceVal = movements.reduce(
  (acc, mov) => (mov > acc ? (acc = mov) : (acc = acc)),
  movements[1]
);
console.log(maxBalanceVal);
//--------------------------------------------------------------------------------------------
//foreach with maps and sets
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

//set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`); //key and value are the same
});
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`); //_ is a throw away variable does not save it
});
//--------------------------------------------------------------------------------------------
//Looping arrays: foreach
//for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  //to get index
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
console.log(`---- For Each ----`);
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
//can break out of a for each loop

//--------------------------------------------------------------------------------------------
//The new at Method
const arr1 = [23, 11, 20];
console.log(arr1[0]);
console.log(arr1.at(0)); //same as above

//get last element of array
console.log(arr1[arr1.length - 1]);
console.log(arr1.slice(-1)[0]); //copy of array need [0] to get the value
console.log(arr1.at(-1)); //works for -2 (2nd to last element)

//works on strings
console.log('jonas'.at(0)); //j
console.log('jonas'.at(-1)); //s

//Array Methods
//--------------------------------------------------------------------------------------------
let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE - doesn't change array
console.log(arr.slice(2)); // new array containg: c, d, e
console.log(arr.slice(2, 4)); // new array containg: c, d
console.log(arr.slice(-2)); // new array containg: d, e
console.log(arr.slice(-1)); // new array containg: e (always last index)
console.log(arr.slice(1, -2)); // new array containg: b, c  -2 not the last 2

//arr.slice() is the same as [...arr]

//SPLICE - changes array - dont use for chaining
console.log(arr.splice(2)); //c, d, e
console.log(arr); // whats left after splice so: a, b
arr.splice(-1); //removes the last element
arr.splice(1, 2); //starts at index 1 and removes 2 elements

//REVERSE - mutates the array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['i', 'j', 'k', 'l', 'm'];
console.log(arr2.reverse()); //revsered
console.log(arr2); //still reverese

//CONCAT - does NOT change the array
const letters = arr.concat(arr2);
console.log(letters); // all the letters
console.log([...arr, ...arr2]); // does the same thing as above

//JOIN
console.log(letters.join(' - ')); //all letters with '-' between
