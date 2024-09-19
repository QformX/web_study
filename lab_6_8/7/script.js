const stack = [];

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * 7); // Выбираем случайный индекс от 0 до 6 (тёмные цвета)
      color += letters[randomIndex];
    }
    return color;
  }
  

function push() {
  const box = document.createElement('div');
  box.style.backgroundColor = getRandomColor();
  box.classList.add('box');
  box.textContent = stack.length + 1;
  document.getElementById('stack').appendChild(box);
  stack.push(box);
}

function pop() {
  const box = stack.pop();
  if (box) {
    box.remove();
  }
}
