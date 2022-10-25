'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

let scores, currentScore, currentPlayer, gameActive;

//gets it set up on start
const init = function () {
  scores = [0, 0]; //total scores
  currentScore = 0;
  currentPlayer = 0; //player 1 = 0, player 2 = 1
  gameActive = true;

  score0El.textContent = 0; //sets scores to 0
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden'); //hides the dice
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore;
  currentPlayer = currentPlayer == 0 ? 1 : 0; //chnages active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

rollBtn.addEventListener('click', function () {
  if (gameActive) {
    //generate dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //add to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      //switch to other player
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (gameActive) {
    scores[currentPlayer] += currentScore;
    document.getElementById(`score--${currentPlayer}`).textContent =
      scores[currentPlayer];

    if (scores[currentPlayer] >= 100) {
      gameActive = false;
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add('player--active');
      diceEl.classList.add('hidden'); //hides the dice
    } else switchPlayer();
  }
});

newBtn.addEventListener('click', function () {
  init();
});
