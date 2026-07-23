# Gift Coin Mini App

Это стартовый проект Telegram Mini App + backend для бота. Проект можно разворачивать на GitHub и Vercel.

## Что здесь есть

- статичный фронтенд Mini App: [index.html](index.html), [styles.css](styles.css), [app.js](app.js)
- простой backend для Telegram: [server.js](server.js)
- локальный запуск через Node.js

## Локальный запуск

1. Установите зависимости:
   ```bash
   npm install
   ```
2. Запустите сервер:
   ```bash
   npm start
   ```
3. Откройте:
   ```text
   http://127.0.0.1:3000/
   ```

## Подготовка к GitHub

1. Инициализируйте git-репозиторий:
   ```bash
   git init
   git add .
   git commit -m "Initial Gift Coin Mini App"
   ```
2. Создайте репозиторий на GitHub и подключите его:
   ```bash
   git branch -M main
   git remote add origin <URL_ВАШЕГО_REPO>
   git push -u origin main
   ```

## Настройка Vercel

1. Зайдите на https://vercel.com и подключите GitHub-репозиторий.
2. Для деплоя выберите проект и укажите:
   - Framework Preset: Other
   - Build Command: `npm run build` (если появится, можно оставить пустым для статического сервера)
   - Output Directory: `.`
3. Для backend-части лучше использовать отдельный хостинг (например Render, Railway, Fly.io), потому что Vercel лучше подходит под frontend/SSR.
4. Если хотите разворачивать только frontend, используйте Vercel для статического сайта, а Telegram webhook и bot-обработку — на отдельном сервере.

## Безопасность

- Не храните токен бота в git.
- Для настоящего деплоя передайте токен через переменные окружения в Vercel/Render/Railway.
- Для локального запуска используйте файл `.env`.

## Что нужно для Telegram

- в настройках бота выставьте webhook на публичный URL вашего backend-сервера;
- Mini App подключается через Telegram WebApp и передаёт initData.
