const tapSound = document.getElementById("tap-sound");
const coinSound = document.getElementById("coin-sound");
const bgMusic = document.getElementById("bg-music");

const panda = document.querySelector(".panda");
const coinCount = document.getElementById("coin-count");
const coinContainer = document.getElementById("coin-container");

let coins = 80;

panda.addEventListener("click", () => {
  tapSound.play();
  coins += 1;
  coinCount.textContent = coins;

  const coin = document.createElement("div");
  coin.classList.add("coin-float");
  coin.textContent = "💰";
  coinContainer.appendChild(coin);

  setTimeout(() => {
    coin.remove();
  }, 1000);
});

function jugar() {
  coinSound.play();
  alert("¡CryptoPanda está cargando!");
}

function referidos() {
  coinSound.play();
  alert("Comparte tu enlace de referidos 🐼");
}

function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
  } else {
    bgMusic.pause();
  }
}
