// Sonidos
const tapSound = document.getElementById("tap-sound");
const coinSound = document.getElementById("coin-sound");
const bgMusic = document.getElementById("bg-music");

// Elementos del juego
const panda = document.querySelector(".panda");
const coinCount = document.getElementById("coin-count");
const coinContainer = document.getElementById("coin-container");

let coins = 80;

// Evento de clic en el panda
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

// Botón Jugar
function jugar() {
  coinSound.play();
  alert("¡CryptoPanda está cargando!");
}

// Botón Referidos
function referidos() {
  coinSound.play();
  alert("Comparte tu enlace de referidos 🧧");
}

// Botón de música
function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
  } else {
    bgMusic.pause();
  }
}

// Botón Start Game
function iniciarJuego() {
  document.getElementById("splash").style.display = "none";
  document.getElementById("game").style.display = "block";
}
