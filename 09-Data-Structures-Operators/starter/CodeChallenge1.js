//CodeCallenge1
/*
We're building a football betting app (soccer for my American friends 😅)!
Suppose we get data from a web service about a certain game ('game' variable on next page). 
In this challenge we're gonna work with that data.
Your tasks:
1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goal keeper and the others are field players. 
    For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, BayernMunich (team1) used 3 substitute players. 
    So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd 
    (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (not an array) 
    and prints each of them to the console, along with the number of goals that were scored in total 
    (number of player names passed in)
7. The team with the lower odd is more likely to win. 
    Print to the console which team is more likely to win, without using an if/else statement or the ternary operator.
Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1. Creat Player arrays
const [players1, players2] = game.players;
console.log(players1);
console.log(players2);

// 2. GK and other players
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3. All players array
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4. Adding in subs
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// 5. Gets odds of the game - was a bit tricky
//const { team1, x: draw, team2 } = game.odds; this or the one below both work
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

// 6. print goals function
const printGoals = function (...players) {
  for (let i = 0; i < players.length; i++) console.log(players[i]);
  console.log(`Total goals scored: ${players.length}`);
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

// 7. Most likely to win (lower odds) - got stuck here
team1 < team2 && console.log(`Team 1 is more likely to win`);
team1 > team2 && console.log(`Team 2 is more likely to win`);

/*
Let's continue with our football betting app! Keep using the 'game' variable from before.
Your tasks:
1. Loop over the game.scored array and print each player name to the console, along with the goal number 
    (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console 
    (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
    Odd of victory Bayern Munich: 1.33 
    Odd of draw: 3.25
    Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). 
    Hint: Note how the odds and the game objects have the same property names 😉
4. Bonus: Create an object called 'scorers' which contains the names of the players who scored as properties, 
    and the number of goals as the value. In this game, it will look like this:
     {
       Gnarby: 1,
       Hummels: 1,
       Lewandowski: 2
}
*/

//1. loop array
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

//2. Calculate average odd
let odds = 0;
for (const odd of Object.values(game.odds)) {
  odds += odd;
}
odds /= Object.values(game.odds).length;
console.log(`Average odds: ${odds}`);

//3. Print the odds
console.log(Object.values(game.odds));
console.log(Object.entries(game.odds));
console.log(Object.keys(game.odds));

for (const [team, odd] of Object.entries(game.odds)) {
  team === 'x'
    ? console.log(`Odd of draw: ${odd}`)
    : console.log(`Odd of victory ${game[team]}: ${odd}`);
}

//Bonus
const scorers = {};
for (const [i, player] of game.scored.entries()) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);

/*
Let's continue with our football betting app! This time, we have a map called 'gameEvents' (see below) with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).
Your tasks:
1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. 
    So remove this event from the game events log.
3. Compute and log the following string to the console:
    "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loopover 'gameEvents' and log each element to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
[FIRST HALF] 17: ⚽   GOAL
*/

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1. Create an array of events with no duplicates
let events = [...new Set(gameEvents.values())];
console.log(events);

//2. remove red card
gameEvents.delete(64);

//3. Average number of events
console.log(
  `An event happened, on average, every ${Math.round(
    90 / gameEvents.size
  )} minutes`
);
const time = [...gameEvents.keys()].pop();
console.log(
  `An event happened, on average, every ${Math.round(
    time / gameEvents.size
  )} minutes`
);

//4. Loop over events and say if they were in the frist half or the second half
for (const [min, action] of gameEvents) {
  min < 45
    ? console.log(`[FIRST HALF] ${min}: ${action}`)
    : console.log(`[SECOND HALF] ${min}: ${action}`);
}
