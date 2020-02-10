/* This is the main program for Project 1 - Guess the number - 
  This program will display the number a user is thinking of
  
  Code author: Denis Poirier, BCA Sum2019, drpoirier 
    Date Started:     Thursday Feb 6 2019
    Date Completed:   in-process
    Last Date Revised:Sunday Feb 9 2019    
*/

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

// hard coding to min & max to begin with ; later these will be changed as user inputs for what they want
let min=1;    // not inclusive of 0
let max=100;  // at first limit the max to 100, then increase it to 500 or give user a choice 

let range = ((max - min)+1); // range = ((max# - min)+1) so it's not 0 

// function source = MDN - The maximum (max) is inclusive and the minimum (min) is inclusive -
//   This function calculates the best/shortest number of tries
let maxTries = (Math.round((Math.log2((max)+1))));

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();
  
async function start() {
  console.log("Let's play a game where you (human user) make up a number and I (computer program) try to guess it.")
  console.log("Please think of a number between " + min + " and " + max + " (inclusive), in this " + range + " number range.");
  let secretNumber = await ask("What is your secret number?\n(This Javascript (JS) program (pgm) won't peek...)\n");
  console.log('FYI, you entered: ' + secretNumber + ' (Again, this will be kept secret until the end!)'); 

if ((secretNumber >= min) && (secretNumber <= max)) {   

// mainGuessing 
  let cpuGuessNum = getRandomIntInclusive(min, max);   // Guessing a random number in the range to start
  console.log('(This program currently randomly guesses only the first try) Is it... ' + cpuGuessNum); 
  let pgmTries = 1; 
  let userRespYorN = await ask('? (Please type a Y or a N only) -> ');
    let userRespYorNUC = userRespYorN.toUpperCase().trim();  // to capitalize letters and also trim spaces
    
  if (userRespYorNUC === 'Y') {
    console.log('You stated that this was the correct number, Yea!');  
    console.log('The program has now tried: ' + pgmTries + ' times.'); // game exits since it's done
    process.exit();
  } else if (userRespYorNUC === 'N') {
    console.log('You stated it was NOT correct, or ' + userRespYorNUC + ' , Sorry.');
    // keepGuessing

  pgmTries = pgmTries + 1;  // add another try
  console.log('The program will try another time - This time makes: ' + pgmTries + ' times.');
  console.log('The maximum number of tries this program should theoretically take is only: ' + maxTries);

  // it was a N, then continue - 
  if (userRespYorNUC === 'N') { 
    continueTrying = (true);}    
  let userRespHorL = await ask("Is it higher (H) or lower (L)? ");
    
  // in case the user used lower case - 
  let userRespHorLUC = userRespHorL.toUpperCase();  
    
  // goes to High Logic -  
    if (userRespHorLUC == 'H') {
   (gotoHighLoop = (true)); 
     // get a Higher range --
     let newMin = cpuGuessNum;
     let newRange = (max - newMin);
     let cpuGuessNum = (newRange/2);
  } else if (userRespHorLUC == 'L') {  // goes to Lower Logic
    (gotoLowLoop = (true));
    // get a lower range --
     let newMax = cpuGuessNum;
     let newRange = (newMax - min);
     let cpuGuessNum = (newRange/2);
     
    // else needs to go to end of pgm after - 
  } else {
   cheatMsgUnexpectedErr(); // putting this in for messages that don't equal y or n
  }
   
} else {
  cheatMsg1();
}  

} else { 
  cheatMsgRangeErr();
}  

endGameMsg(); // totally ends out of the game
process.exit();
}

// -----------putting various message functions and exit functions below this line -----------

function cheatMsg1() {
  console.log('Sorry, something did not compute!');
  endGameMsg();
  process.exit();
}

/* function cheatMsg2() {
  console.log('Sorry, something did not compute! You entered: ' + userRespHorL + 'or we tried to compute: ' + userReponseHorLUC);
} */  // commenting out for now until more code is written

function endGameMsg() {
  console.log("We're done then. Goodbye."); // temporarily ending game after one random try
}

function cheatMsgRangeErr() {
   console.log('Sorry, the program is exiting because the number was outside the given range expected, Sorry.');
   endGameMsg();
   process.exit();
}

function cheatMsgUnexpectedErr() {
  console.log('Sorry, the program is exiting because the answer given was not what was expected, Sorry.');
  endGameMsg();
  process.exit();
} 
