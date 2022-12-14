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
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  //if sorted is set to true, sort in acsending order
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  //for each movement create a dom element for it
  movs.forEach(function (mov, i) {
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
//console.log(containerMovements.innerHTML); shows all the html created from the foreach loop

//Calcualte and Display the Balance
const calcDisplayBalance = account => {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance}???`;
};

//Calc Display Summary
const calcDisplaySummary = acc => {
  //Calc money coming in
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}???`;

  //calc money coming in
  const outs = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outs)}???`;

  //calc intreset 1.2% on all the depoists
  const interest = acc.movements
    .filter(mov => mov > 0) //gets deposits
    .map(mov => (mov * acc.interestRate) / 100) //gets interest on the deposit values
    .filter(mov => mov >= 1) //only values that are greater than 1
    .reduce((acc, mov) => acc + mov, 0); //adds them all together
  labelSumInterest.textContent = `${interest}???`;
  console.log(incomes, outs, interest);
};

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

const updateUI = acc => {
  //Display Movements
  displayMovements(acc.movements);

  //Display Balance
  calcDisplayBalance(acc);

  //Display Summary
  calcDisplaySummary(acc);
  console.log(currentAccount);
};

//Login feature of application
/*
  check username and pin when click the login button or hit enter
  then load the data created above
*/
let currentAccount;

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  console.log('Login');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  //the ? will make sure it will only execute if it exists
  if (currentAccount?.pin == Number(inputLoginPin.value)) {
    //Display UI and Welcome Messsage
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //clear the input fields
    inputLoginPin.value = inputLoginUsername.value = ''; //remove the data from the input fields
    inputLoginPin.blur(); //removes the cursor from the inout field

    updateUI(currentAccount);

    console.log('Loged in');
  }

  console.log(currentAccount);
});

//trasnfer
btnTransfer.addEventListener('click', e => {
  e.preventDefault(); //makes sure it doesnt reload
  const amount = Number(inputTransferAmount.value);
  const recieveAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  ); //should be the username 'jd'
  console.log(amount, recieveAcc);

  //clear the input fields
  inputTransferAmount.value = inputTransferTo.value = '';

  //check current user has enough money && amount is greater than 0 && that the recieving account exists and is not the same as teh current user
  if (
    amount > 0 &&
    recieveAcc &&
    currentAccount.balance >= amount &&
    recieveAcc?.username !== currentAccount.username
  ) {
    console.log(`Transfer Valid`);
    //add negative movement to current user
    currentAccount.movements.push(-amount);
    //add positive movement to reciving user
    recieveAcc.movements.push(amount);

    //update UI
    updateUI(currentAccount);
  }
});

//Loan
btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  inputLoanAmount.value = ''; //clear field

  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= loanAmount * 0.1)
  ) {
    //Add positive depoit
    currentAccount.movements.push(loanAmount);

    //update UI
    updateUI(currentAccount);
  }
});

//Close account
btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(`Account Closed`);
    //Removers account
    accounts.splice(index, 1);

    //hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sortedState = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sortedState);
  sortedState = !sortedState;
});

/////////////////////////////////////////////////
console.log(`---- Lectures ---`);

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
//Sorting arrays

//sort only works on strings
const owners = ['Jonas', 'Martha', 'Zach', 'Adam'];
console.log(owners.sort()); //changes teh array
console.log(owners);

//numbers
console.log(movements);
console.log(movements.sort()); //-130, -400, -650, 1300, 200, 3000, 450, 70

//return < 0: a, b (keep order)
//return > 0: b, a (switch order)
//accessending
movements.sort((a, b) => (a > b ? 1 : -1));

//could also do
movements.sort((a, b) => a - b);
console.log(movements); //-650, -400, -130, 70, 200, 450, 1300, 3000

//decessending
movements.sort((a, b) => (b > a ? 1 : -1));
//could also do
movements.sort((a, b) => b - a);
console.log(movements); //-650, -400, -130, 70, 200, 450, 1300, 3000

//--------------------------------------------------------------------------------------------
//Flat and flatmap
const arr3 = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr3.flat()); //removes nested arrays [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); //only one level deep [[1,2], 3, 4, [5, 6], 7, 8]
console.log(arrDeep.flat(2)); // removes 2 levels deep [[1, 2, 3, 4, 5, 6, 7, 8] - 2 is deepness

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements); //arrays of each movements per account
const allMovements = accountMovements.flat();
console.log(allMovements);
const overallbalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overallbalance);

// ^ with chaining
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

//flatmap combines map and flat together
const overallBalance2 = accounts
  .flatMap(acc => acc.movements) //only goes 1 level deep
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);
//--------------------------------------------------------------------------------------------
//some and every
//Equality
console.log(movements);
console.log(movements.includes(-130));

//Some : Condition
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

const anyDepositsOver1500 = movements.some(mov => mov > 1500);
console.log(anyDepositsOver1500);

//Every
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

//Seperate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

//--------------------------------------------------------------------------------------------
//find method - loops over array retrives an element
//  retrives first element in the array
const firstWithdrawl = movements.find(mov => mov < 0);
console.log(firstWithdrawl);

console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis'); //only gets Jessicas account
console.log(account);

let accountFor = {};
for (const acc of accounts) {
  acc.owner === 'Jessica Davis' ? (accountFor = acc) : false;
}
console.log(accountFor);

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
