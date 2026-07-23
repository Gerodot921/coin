const state = {
  balance: 23456789,
  activeScreen: "home",
};

const screens = [...document.querySelectorAll(".screen")];
const navItems = [...document.querySelectorAll(".nav-item")];
const toast = document.getElementById("toast");
const balanceEl = document.getElementById("coinBalance");
const profileBalanceEl = document.getElementById("profileBalance");
const copyState = document.getElementById("copyState");
const copyBtn = document.getElementById("copyBtn");
const botStatus = document.getElementById("botStatus");
const copyWebhookBtn = document.getElementById("copyWebhookBtn");
const refreshInitDataBtn = document.getElementById("refreshInitDataBtn");

function formatBalance(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function syncBalance() {
  const formatted = formatBalance(state.balance);
  balanceEl.textContent = formatted;
  profileBalanceEl.textContent = formatted;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 1800);
}

function setScreen(name) {
  state.activeScreen = name;
  screens.forEach((screen) => {
    const isActive = screen.dataset.screen === name;
    screen.hidden = !isActive;
    screen.classList.toggle("screen-active", isActive);
  });

  navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.nav === name);
  });

  showToast(`${name.toUpperCase()} открыт`);
}

function adjustBalance(delta, label) {
  state.balance = Math.max(0, state.balance + delta);
  syncBalance();
  showToast(label);
}

document.addEventListener("click", (event) => {
  const navButton = event.target.closest("[data-nav]");
  if (navButton) {
    setScreen(navButton.dataset.nav);
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (actionButton) {
    const action = actionButton.dataset.action;

    if (action === "buy") {
      adjustBalance(2500, "BUY: +2,500 GIFT");
    }

    if (action === "sell") {
      adjustBalance(-1800, "SELL: -1,800 GIFT");
    }

    if (action === "battle") {
      adjustBalance(9000, "БИТВА выиграна: +9,000 GIFT");
    }

    if (action === "avatar") {
      showToast("Аватар открыт для замены");
    }

    if (action === "notifications") {
      showToast("Уведомления включены");
    }

    if (action === "language") {
      showToast("Язык: RU");
    }

    if (action === "support") {
      showToast("Поддержка: 24/7");
    }

    if (action === "logout") {
      showToast("Выход из аккаунта");
    }

    return;
  }

  const buyChip = event.target.closest("[data-buy]");
  if (buyChip) {
    const price = Number(buyChip.dataset.buy);
    adjustBalance(-price, `Покупка NFT: -${price} GIFT`);
  }
});

copyBtn.addEventListener("click", async () => {
  const code = document.getElementById("referralCode").textContent;

  try {
    await navigator.clipboard.writeText(code);
    copyState.textContent = "скопировано";
    showToast("Реферальный код скопирован");
  } catch {
    copyState.textContent = "не удалось";
    showToast("Не удалось скопировать код");
  }
});

copyWebhookBtn.addEventListener("click", async () => {
  const webhookUrl = `${window.location.origin}/webhook/telegram`;
  try {
    await navigator.clipboard.writeText(webhookUrl);
    botStatus.textContent = "webhook copied";
    showToast("Webhook URL скопирован");
  } catch {
    botStatus.textContent = "copy failed";
    showToast("Не удалось скопировать webhook URL");
  }
});

refreshInitDataBtn.addEventListener("click", async () => {
  try {
    const res = await fetch(`/telegram/init-data?initData=${encodeURIComponent('demo-init-data')}`);
    const data = await res.json();
    botStatus.textContent = data.ok ? 'initData ready' : 'initData failed';
    showToast("initData обновлён");
  } catch {
    botStatus.textContent = 'initData failed';
    showToast("Не удалось обновить initData");
  }
});

document.getElementById("menuBtn").addEventListener("click", () => {
  showToast("Меню приложения");
});

syncBalance();
setScreen("home");

if (window.Telegram?.WebApp) {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  tg.setHeaderColor?.("#0b0b0b");
  tg.setBackgroundColor?.("#0b0b0b");
}