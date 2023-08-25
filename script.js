'use strict';

import * as confetti from './confetti.js';

const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const playerElements = [
  playerRock,
  playerPaper,
  playerScissors,
  playerLizard,
  playerSpock,
];
const computerElements = [
  computerRock,
  computerPaper,
  computerScissors,
  computerLizard,
  computerSpock,
];

const allGameIcons = document.querySelectorAll('.far');

let selectChoice = '';
let arrChoices = [];
let playerWon = 0;
let computerWon = 0;

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

const clearChoices = function (elements) {
  elements.forEach(i => i.classList.remove('selected'));
};

const select = function (playerChoice) {
  clearChoices(playerElements);

  switch (playerChoice) {
    case 'rock':
      playerRock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Rock';
      selectChoice = 'rock';
      break;
    case 'paper':
      playerPaper.classList.add('selected');
      playerChoiceEl.textContent = ' --- Paper';
      selectChoice = 'paper';
      break;
    case 'scissors':
      playerScissors.classList.add('selected');
      playerChoiceEl.textContent = ' --- Scissors';
      selectChoice = 'scissors';
      break;
    case 'lizard':
      playerLizard.classList.add('selected');
      playerChoiceEl.textContent = ' --- Lizard';
      selectChoice = 'lizard';
      break;
    case 'spock':
      playerSpock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Spock';
      selectChoice = 'spock';
      break;
  }
  computerSelect();
  compare();
};

const computerSelect = function () {
  clearChoices(computerElements);
  const randomNumber = Math.round(Math.random() * 4);
  for (const choice in choices) arrChoices.push(choice);

  const computerChoice = arrChoices[randomNumber];

  switch (computerChoice) {
    case 'rock':
      computerRock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      computerPaper.classList.add('selected');
      computerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      computerScissors.classList.add('selected');
      computerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      computerLizard.classList.add('selected');
      computerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock':
      computerSpock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Spock';
      break;
  }

  return computerChoice;
};

const compare = function () {
  const computerChoice = computerSelect();

  const defeat1 = choices[selectChoice].defeats[0];
  const defeat2 = choices[selectChoice].defeats[1];

  if (defeat1 === computerChoice || defeat2 === computerChoice) {
    playerWon++;
    resultText.textContent = 'You Won!';
    confetti.startConfetti();
    setTimeout(confetti.stopConfetti, 4000);
  } else if (selectChoice === computerChoice) {
    resultText.textContent = `That's a tie!`;
    confetti.stopConfetti();
  } else {
    computerWon++;
    resultText.textContent = 'You Lost!';
    confetti.stopConfetti();
  }

  playerScoreEl.textContent = playerWon;
  computerScoreEl.textContent = computerWon;
};

const resetGame = function () {
  playerWon = 0;
  computerWon = 0;
  playerScoreEl.textContent = playerWon;
  computerScoreEl.textContent = computerWon;
  [playerChoiceEl, computerChoiceEl, resultText].forEach(
    i => (i.textContent = '')
  );
  clearChoices(playerElements.concat(computerElements));
  confetti.removeConfetti();
};

window.select = select;
window.resetGame = resetGame;

resetGame();
