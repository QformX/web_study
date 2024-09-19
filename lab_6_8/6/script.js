const queue = [];

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * 7); // Выбираем случайный индекс от 0 до 6 (тёмные цвета)
    color += letters[randomIndex];
  }
  return color;
}


function enqueue() {
  const square = document.createElement('div');
  square.classList.add('square');
  square.style.backgroundColor = getRandomColor();
  const number = document.createElement('span');
  number.classList.add('number');
  number.textContent = queue.length + 1;
  square.appendChild(number);
  document.getElementById('queue').appendChild(square);
  queue.push(square);
}

function dequeue() {
  const square = queue.shift();
  if (square) {
    square.remove();
    updateNumeration();
  }
}

function updateNumeration() {
  const squares = document.querySelectorAll('.square');
  squares.forEach((square, index) => {
    const number = square.querySelector('.number');
    number.textContent = index + 1;
  });
}
