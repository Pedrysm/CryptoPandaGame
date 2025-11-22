// === Telegram WebApp SDK ===
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// === Usuario y estado inicial ===
const userId = tg.initDataUnsafe?.user?.id || 123456789;
let coins = 0;
let energy = 5000;
let maxEnergy = 5000;
let multitap = 5;
let rechargeSpeed = 3;

// === Elementos del DOM ===
const coinsEl = document.getElementById('coins');
const energyFill = document.getElementById('energyFill');
const energyText = document.getElementById('energyText');
const panda = document.getElementById('panda');

// === Supabase Config ===
const SUPABASE_URL = "https://mixbbsgniudsgcucyfwe.supabase.co";
const SUPABASE_KEY = "TU_ANON_KEY_AQUI"; // ⚠️ Reemplaza con tu anon key real

// === Función: Actualizar interfaz ===
function updateDisplay() {
  coinsEl.textContent = `${coins.toLocaleString()} $PANDA`;
  energyText.textContent = `${energy} / ${maxEnergy} ⚡️`;
  energyFill.style.width = `${(energy / maxEnergy) * 100}%`;
}

// === Función: Cargar datos del usuario ===
async function loadUserData() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/users?id=eq.${userId}`, {
      headers: { apikey: SUPABASE_KEY }
    });
    const data = await res.json();
    if (data[0]) {
      coins = data[0].coins ?? 0;
      energy = data[0].energy ?? 5000;
      maxEnergy = data[0].max_energy ?? 5000;
      multitap = data[0].multitap ?? 5;
      rechargeSpeed = data[0].recharge_speed ?? 3;
      updateDisplay();
    }
  } catch (err) {
    console.error("❌ Error al cargar datos:", err);
    tg.showAlert("Error al cargar tus datos. Intenta más tarde.");
  }
}

// === Función: Guardar progreso ===
async function saveProgress() {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/users?id=eq.${userId}`, {
      method: 'PATCH',
      headers: {
        apikey: SUPABASE_KEY,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        coins,
        energy,
        last_energy_update: new Date().toISOString()
      })
    });
  } catch (err) {
    console.error("❌ Error al guardar progreso:", err);
  }
}

// === Función: Animación de monedas ===
function spawnCoins() {
  for (let i = 0; i < 10; i++) {
    const coin = document.createElement('div');
    coin.textContent = "🪙";
    coin.style.position = 'absolute';
    coin.style.left = `${50 + (Math.random() * 20 - 10)}%`;
    coin.style.top = `${50 + (Math.random() * 20 - 10)}%`;
    coin.style.fontSize = `${1.5 + Math.random()}em`;
    coin.style.pointerEvents = 'none';
    coin.style.animation = 'floatUp 1s ease-out forwards';
    coin.style.zIndex = 999;
    document.body.appendChild(coin);
    setTimeout(() => coin.remove(), 1000);
  }
}

// === Evento: Tap al panda ===
panda.addEventListener('click', () => {
  if (energy < 1) {
    tg.showAlert("⚡️ Sin energía. Espera la recarga...");
    return;
  }

  energy--;
  coins += multitap;
  updateDisplay();
  spawnCoins();
  saveProgress();
});

// === Bucle: Recarga de energía ===
setInterval(() => {
  if (energy < maxEnergy) {
    energy += rechargeSpeed;
    if (energy > maxEnergy) energy = maxEnergy;
    updateDisplay();
  }
}, 1000);

// === Iniciar juego ===
loadUserData();
