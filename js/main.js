import Card from './cards.js'

const screens = document.querySelectorAll('.container');
const againBtn = document.querySelector('.again-btn');

const timeEl = document.getElementById('time');
const startBtn = document.getElementById('start');
const boardList = document.getElementById('board-list');
const container = document.getElementById('game');

let time = 0;
let cardsCount = 0;
let timer;

let cardsNumArray = [];
let cardsArray = [];
let firstCard = null;
let secondCard = null;

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

againBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[1].classList.remove('up');

  game.innerHTML = '';
});

boardList.addEventListener('click', (event) => {
  if (event.target.classList.contains('board-btn')) {
    cardsCount = parseInt(event.target.getAttribute('data-card'));
    getBoard(cardsCount);
  }
});

boardList.addEventListener('click', (event) => {
  if (event.target.classList.contains('board-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    startGame();
  }
});

function getBoard(el) {
  if (el === 16) {
    container.style.width = '400px';
  } else if (el === 24) {
    container.style.width = '600px';
  }
};

function decreaseTime() {
  if (time === 0) {
    timerStop()
  } else {
    let current = --time;

    if (current < 10) {
      current = `0${current}`
    };

    setTime(current);
  }
};

function setTime(value) {
  if (value >= 60) {
    let sec = value - 60;

    if (sec < 10) {
      sec = `0${sec}`
    };

    timeEl.innerHTML = `01:${sec}`;
  } else {
    timeEl.innerHTML = `00:${value}`;
  }
};

function timerStop() {
  stopGame();

  timer = clearInterval(timer);
  time = 0;

  game.innerHTML = `<h1>Время вышло</h1>`;
};

function creatCardsArray() {
  for (let i = 1; i <= cardsCount / 2; i++) {
    cardsNumArray.push(i);
    cardsNumArray.push(i);
  };

  cardsNumArray = cardsNumArray.sort(() => Math.random() - 0.5);

  for (const cardNum of cardsNumArray) {
    cardsArray.push(new Card(container, cardNum, flip))
  };
};

function flip(card) {
  if (firstCard !== null && secondCard !== null) {
    if (firstCard.number !== secondCard.number) {
      firstCard.open = false;
      secondCard.open = false;
      firstCard = null;
      secondCard = null;
    }
  };

  if (firstCard === null) {
    firstCard = card;
  } else {
    if (secondCard === null) {
      secondCard = card;
    }
  };

  if (firstCard !== null && secondCard !== null) {
    if (firstCard.number === secondCard.number) {
      firstCard.success = true;
      secondCard.success = true;

      firstCard = null;
      secondCard = null;
    }
  };

  if (document.querySelectorAll('.card.success').length === cardsNumArray.length) {
    stopGame();
    game.innerHTML = `<h1>Победа!</h1>`;
  }
};

function startGame() {
  screens[1].classList.add('up');
  timer = setInterval(decreaseTime, 1000);
  setTime(time);
  creatCardsArray();

  timeEl.parentNode.classList.remove('hide');
  againBtn.classList.remove('active');
};

function stopGame() {
  cardsNumArray = [];
  cardsArray = [];
  firstCard = null;
  secondCard = null;
  cardsCount = 0;

  timer = clearInterval(timer);

  timeEl.parentNode.classList.add('hide');
  againBtn.classList.add('active');
};
