const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const botToken = process.env.BOT_TOKEN;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'gift-coin-mini-app', botTokenConfigured: Boolean(botToken) });
});

app.post('/webhook/telegram', (req, res) => {
  const update = req.body || {};
  const message = update.message || {};
  const text = message.text || '';

  if (!text) {
    res.json({ ok: true });
    return;
  }

  const replyText = [
    '🎉 Gift Coin активен!',
    'Открой Mini App через кнопку в меню бота.',
    'Текущий баланс можно проверить прямо в приложении.'
  ].join('\n');

  res.json({ ok: true, replyText });
});

app.get('/telegram/init-data', (req, res) => {
  const initData = req.query.initData || '';
  res.json({ ok: true, initData, message: 'initData received' });
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Gift Coin server running on http://127.0.0.1:${port}`);
});
