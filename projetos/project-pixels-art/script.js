const pixelSquare = document.getElementById('pixel-board');
document.querySelectorAll('.color')[0].style.backgroundColor = 'rgb(0, 0, 0)';

function createPixels(number = 5) {
  for (let evenCreateLine = 0; evenCreateLine < number; evenCreateLine += 1) {
    const eachLines = document.createElement('div');
    for (let evenCompleteSquare = 0; evenCompleteSquare < number; evenCompleteSquare += 1) {
      const pixelFrame = document.createElement('div');
      pixelFrame.className = 'pixel';
      pixelFrame.classList.add('pixel');
      eachLines.appendChild(pixelFrame);
    }
    document.getElementById('pixel-board').appendChild(eachLines);
  }
}
createPixels();

const colorPalette = document.querySelector('#color-palette');
const select = function select(event) {
  const selectColor = document.querySelector('.selected');
  if (event.target.id !== 'color-palette') {
    selectColor.classList.remove('selected');
    event.target.classList.add('selected');
  }
};
colorPalette.addEventListener('click', select);

const getPixel = function getPixelSquare(event) {
  if (event.target.className === 'pixel') {
    const currentColor = document.querySelector('.selected').style.backgroundColor;
    const selectedColor = event.target;
    selectedColor.style.backgroundColor = currentColor;
  }
};
pixelSquare.addEventListener('click', getPixel);

const clearPallete = document.querySelector('#clear-board');
const clear = function clearSquare() {
  const pixelFrame = document.querySelectorAll('.pixel');
  for (let paint = 0; paint < pixelFrame.length; paint += 1) {
    pixelFrame[paint].style.backgroundColor = 'white';
  }
};
clearPallete.addEventListener('click', clear);

function optionUser() {
  const input = document.getElementById('board-size');
  const choiceButton = document.getElementById('generate-board');
  choiceButton.addEventListener('click', () => {
    const pixelBox = pixelSquare;
    if (input.value === '') {
      alert('Board inválido!');
      input.value = 5;
    } else if (input.value <= 5) {
      input.value = 5;
    } else if (input.value >= 50) {
      input.value = 50;
    }
    pixelBox.innerHTML = '';
    createPixels(input.value);
  });
}
optionUser();

function randomPalettes() {
  const color = document.getElementsByClassName('color');
  for (let index = 1; index < color.length; index += 1) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const rgb = `rgb(${r}, ${g}, ${b})`;
    color[index].style.backgroundColor = rgb;
  } // fonte: https://wallacemaxters.com.br/blog/2021/02/20/como-gerar-cores-aleatorias-no-javascript
}
randomPalettes();
