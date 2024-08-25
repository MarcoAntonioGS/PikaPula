const pikachu = document.querySelector('.pikachu');
const cacturne = document.querySelector('.cacturne');
let gameOver = false;
let gameStarted = false;
let score = 0;
const scoreDisplay = document.querySelector('.score');

const jump = () => {
  pikachu.classList.add('jump'); 
  setTimeout(() => {
    pikachu.classList.remove('jump');
  }, 500);
};

const loop = setInterval(() => {
  const cacturnePosition = cacturne.offsetLeft;
  const pikachuPosition = window.getComputedStyle(pikachu).bottom.replace('px', '');
  
  if (cacturnePosition <= 60 && cacturnePosition > -50 && pikachuPosition < 130) {
    gameOver = true;
    
    cacturne.style.animation = 'none';
    cacturne.style.left = `${cacturnePosition}px`; 
    
    pikachu.style.animation = 'none';
    pikachu.style.bottom = `${pikachuPosition}px`;
    
    [].slice.apply(document.images).filter(is_gif_image).map(freeze_gif);

    function is_gif_image(i) {
      return /^(?!data:).*\.gif/i.test(i.src);
    }

    function freeze_gif(i) {
      var c = document.createElement('canvas');
      var w = c.width = i.width;
      var h = c.height = i.height;
      c.getContext('2d').drawImage(i, 0, 0, w, h);
      try {
        i.src = c.toDataURL("image/gif"); // if possible, retain all css aspects
      } catch(e) { // cross-domain -- mimic original with all its tag attributes
        for (var j = 0, a; a = i.attributes[j]; j++)
            c.setAttribute(a.name, a.value);
        i.parentNode.replaceChild(c, i);
      }
    }
    
    document.removeEventListener('keydown', jump);
    clearInterval(scoreInterval);
    clearInterval(loop);
    
    const message = document.createElement('div');
    message.innerText = 'Game Over';
    message.style.fontSize = '3em';
    message.style.color = 'red';
    message.style.textAlign = 'center';
    message.style.position = 'absolute';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(message);
    
    document.addEventListener('keydown', restart);
    function restart() {
      window.location.reload();
    }
  }
  
  if (!gameOver) {
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
  }
  
}, 10);

const scoreInterval = setInterval(() => {
  if (!gameOver) {
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
  }
}, 1000);

document.addEventListener('keydown', jump);