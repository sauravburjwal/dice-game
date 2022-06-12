'use strict';

let score0 = 0;
let score1 = 0;
let current = 0;
let chance = -1;
const player = document.querySelector('.player');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const activePlayer = document.querySelector('.player--active');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player0score = document.querySelector('#score--0');
const player1score = document.querySelector('#score--1');
const current0score = document.querySelector('#current--0');
const current1score = document.querySelector('#current--1');

const imgDice = document.querySelector('.dice');

imgDice.classList.add('hidden');

const switchPlayer = function () {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');

  current = 0;
  current0score.textContent = current;
  current1score.textContent = current;
  chance = chance * -1;
};
const winPlayer = function (plId) {
  plId.classList.add('player--winner');

  btnHold.disabled = true;
  btnRoll.disabled = true;
  imgDice.classList.add('hidden');
};

btnRoll.addEventListener('click', function () {
  const randomNumber = Math.trunc(Math.random() * 6) + 1;
  imgDice.classList.remove('hidden');
  imgDice.src = `dice-${randomNumber}.png`;

  if (randomNumber === 1) {
    switchPlayer();
  } else {
    current += randomNumber;
    chance === -1
      ? (current0score.textContent = current)
      : (current1score.textContent = current);
  }
});
btnHold.addEventListener('click', function () {
  if (chance === -1) {
    score0 += current;
    player0score.textContent = score0;
    if (score0 >= 100) {
      winPlayer(player0);
    } else switchPlayer();
  } else {
    score1 += current;
    player1score.textContent = score1;
    if (score1 >= 100) {
      winPlayer(player1);
    } else switchPlayer();
  }
});
btnNew.addEventListener('click', function () {
  player0.classList.remove('player--winner');
  player1.classList.remove('player--active', 'player--winner');
  player0.classList.add('player--active');

  score0 = 0;
  score1 = 0;
  current = 0;
  chance = -1;
  current0score.textContent = current;
  current1score.textContent = current;
  player0score.textContent = score0;
  player1score.textContent = score1;
  imgDice.classList.add('hidden');
  btnHold.disabled = false;
  btnRoll.disabled = false;
});
