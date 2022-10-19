'use strict';

//. = class, #-id

let secretNum = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
//console.log(secretNum);

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (score > 0) {
    if (!guess) {
      //when no input of they guess 0
      displayMessage(`⛔️ No number!`);
    } else if (guess !== secretNum) {
      //guess is not correct
      displayMessage(
        guess > secretNum
          ? `📈 Too high...` //if guess is higher
          : `📉 Too low... ` //if guess is lower
      );
      score--;
      document.querySelector('.score').textContent = score;
    } else if (guess === secretNum) {
      //when player wins
      displayMessage(`Correct Number🎉`);
      document.querySelector('.number').textContent = secretNum;
      document.querySelector('body').style.backgroundColor = '#60b347'; //change background color to green
      document.querySelector('.number').style.width = '30rem'; //make the number bigger
      if (score > highscore) {
        //if the score is higher than the current high score
        highscore = score;
        document.querySelector('.highscore').textContent = score;
      }
    }
  } else {
    displayMessage(`😭 You lost the game!`);
  }
});

/*
Implement a game rest functionality, so that the player can make a new guess!
Your tasks:
1. Select the element with the 'again' class and attach a click event handler 
2. In the handler function, restore initial values of the 'score' and 'secretNumber' variables
3. Restore the initial conditions of the message, number, score and guess input fields
4. Also restore the original background color(#222) and number width(15rem)
*/
document.querySelector('.again').addEventListener('click', function () {
  //resets back to the original starting values of the game
  score = 20;
  secretNum = Math.trunc(Math.random() * 20) + 1;

  displayMessage(`Start guessing...`); //changes message
  document.querySelector('.score').textContent = score; //sets the score back to 20
  document.querySelector('body').style.backgroundColor = '#222'; //change background color to green
  document.querySelector('.number').style.width = '15rem'; //make the number bigger
  document.querySelector('.number').textContent = '?'; //changes from secret num to '?'
  document.querySelector('.guess').value = ''; //remove the value
  //console.log(secretNum);
});
