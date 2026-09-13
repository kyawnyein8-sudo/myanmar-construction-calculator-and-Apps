// Apps Data
const apps = [
  { name: "ခေါင်မိုး", icon: "🏠", url: "roof.html" },
  { name: "ကွန်ကရစ်", icon: "🏗️", url: "concrete.html" },
  { name: "အုတ်စီရန်", icon: "🧱", url: "brick.html" },
  { name: "သံချောင်း", icon: "🔩", url: "steel.html" },
  { name: "ဆေးသုတ်ရန်", icon: "🎨", url: "paint.html" },
  { name: "ကြွေပြားခင်း", icon: "🔲", url: "tile.html" },
  { name: "သစ်တွက်ရန်", icon: "🪵", url: "wood.html" },
  { name: "Unit Converter", icon: "📐", url: "converter.html" },
  { name: "မှတ်စု", icon: "📝", url: "notes.html" },
  { name: "တခြား Apps များ", icon: "🌐", url: "more.html" }
];

// Shops / Ads Data
const shops = [
  { name: "ရွှေနဂါး ဆောက်လုပ်ရေး", location: "လှိုင်သာယာ၊ ရန်ကုန်။", phone: "09123456789", isVip: true },
  { name: "အောင်မင်္ဂလာ သံ/အုတ်ဆိုင်", location: "မရမ်းကုန်း၊ ရန်ကုန်။", phone: "09123456789", isVip: false }
];
[9/13/2026 2:06 PM] Kyaw Nyein: .price-ticker-bar {
  background: linear-gradient(90deg, #0f172a, #1e293b);
  color: #f8fafc;
  padding: 10px 0;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-bottom: 1.5px solid #334155;
}

.ticker-track {
  display: inline-block;
  white-space: nowrap;
  animation: tickerScroll 25s linear infinite;
  padding-left: 100%;
}

.ticker-track:hover {
  animation-play-state: paused;
}

@keyframes tickerScroll {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-100%, 0, 0); }
}

.ticker-item {
  display: inline-block;
  margin-right: 50px;
  font-size: 0.9rem;
  font-weight: 600;
}

.ticker-item span {
  color: #fbbf24;
  font-weight: 700;
  margin-left: 6px;
}
[9/13/2026 2:09 PM] Kyaw Nyein: async function loadPriceTicker() {
  const tickerContainer = document.getElementById('priceTicker');
  if (!tickerContainer) return;

  const prices = [
    { name: "ဘိလပ်မြေ (၁ အိတ်)", price: "18,000 Ks" },
    { name: "အုတ် (၁ လုံး)", price: "550 Ks" },
    { name: "သဲ (၁ ကျင်း)", price: "75,000 Ks" },
    { name: "သံချောင်း (၁ ပိဿာ)", price: "4,200 Ks" }
  ];

  tickerContainer.innerHTML = prices.map(item => 
    <div class="ticker-item">
      🏗️ ${item.name}: <span>${item.price}</span>
    </div>
  ).join('');
}

window.addEventListener(loadPriceTicker();, () => {
  renderApps();
  renderShops();
  loadSavedPrices();
  renderHistory();
  initServiceWorker();
});

function renderApps() {
  const container = document.getElementById('appsContainer');
  if (!container) return;
  
  container.innerHTML = apps.map(app => `
    <a class="app-card" href="./${app.url}?v=2.0">
      <div class="app-icon">${app.icon}</div>
      <div class="app-name">${app.name}</div>
    </a>
  `).join('');
}

function renderShops() {
  const container = document.getElementById('shopsContainer');
  if (!container) return;

  container.innerHTML = shops.map(s => `
    <div class="shop-card ${s.isVip ? 'is-vip' : ''}">
      ${s.isVip ? '<div class="vip-badge">✨ VIP SPONSOR</div>' : ''}
      <div style="font-weight:bold;">${s.name}</div>
      <div style="font-size:0.8rem; color:#666;"><i class="fa-solid fa-location-dot"></i> ${s.location}</div>
      <a href="tel:${s.phone}" class="call-btn"><i class="fa-solid fa-phone"></i> ဖုန်းခေါ်မည်</a>
    </div>
  `).join('');
}

function switchTab(tabId, btn) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  
  document.getElementById(tabId).classList.add('active');
  btn.classList.add('active');

  if (tabId === 'tab-history') renderHistory();
}

function savePrices() {
  const cement = document.getElementById('cementPrice').value;
  const brick = document.getElementById('brickPrice').value;
  const steel = document.getElementById('steelPrice').value;
  
  localStorage.setItem('myanmar_hub_prices', JSON.stringify({ cement, brick, steel }));
  alert('ဈေးနှုန်းများ သိမ်းဆည်းပြီးပါပြီ!');
}

function loadSavedPrices() {
  const saved = localStorage.getItem('myanmar_hub_prices');
  if (!saved) return;
  try {
    const p = JSON.parse(saved);
    if (p.cement) document.getElementById('cementPrice').value = p.cement;
    if (p.brick) document.getElementById('brickPrice').value = p.brick;
    if (p.steel) document.getElementById('steelPrice').value = p.steel;
  } catch (e) {}
}

function renderHistory() {
  const container = document.getElementById('historyListContainer');
  if (!container) return;
  const history = JSON.parse(localStorage.getItem('myanmar_hub_history') || '[]');
  
  if (history.length === 0) {
    container.innerHTML = '<p style="color:#888; text-align:center;">မှတ်တမ်းများ မရှိသေးပါ။</p>';
    return;
  }
  
  container.innerHTML = history.map(item => `
    <div style="background:white; padding:12px; border-radius:8px; margin-bottom:8px; display:flex; justify-content:space-between; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
      <div>
        <strong style="color:#1e6bb8; font-size:0.9rem;">${item.title}</strong>
        <div style="font-size:0.75rem; color:#888;">${item.date}</div>
      </div>
      <span style="font-weight:bold; color:#d9534f;">${item.result}</span>
    </div>
  `).join('');
}

// ဤနေရာတွင် သီးသန့်ပြင်ဆင်ထားသော clearHistory() function
function clearHistory() {
  if (confirm("မှတ်တမ်းများအားလုံးကို တကယ် ဖျက်မှာ သေချာပါသလား။")) {
    localStorage.removeItem('myanmar_hub_history');
    renderHistory();
  }
}

function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW Fail:', err));
  }
}
