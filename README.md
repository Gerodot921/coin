# GIFT COIN deployment

## What this repo contains
- `Qwen_html_20260725_8vxtp8ags.html` - frontend for Vercel / Telegram Mini App.
- `Qwen_js_20260725_tgmuaryvu.txt` - backend source.
- `server.js` - Node entry point that loads the backend file.
- `api/[...path].js` - Vercel proxy to the backend server.
- `vercel.json` - routes the Vercel root to the HTML file.

## Local run
1. Start backend:
   ```bash
   npm start
   ```
2. Open the HTML file in a browser.
3. For local testing, use:
   ```text
   file:///D:/ProjectM/coin/Qwen_html_20260725_8vxtp8ags.html?api=http://localhost:3001
   ```

## Deploy backend to your server
- Run `node server.js` or `npm start`.
- Set environment variables:
  - `PORT` - server port, for example `3001`.
  - `BOT_TOKEN` - Telegram bot token from BotFather.
  - `SERVER_SECRET` - secret for token signing.
  - `AUTH_DEV=0` - keep dev auth disabled in production.
  - `CORS_ORIGIN` - set to your Vercel domain if you ever call the backend directly.
- Make sure the backend is available over HTTPS.

## Deploy frontend to Vercel
- Import this folder into Vercel as a project.
- Set the environment variable `BACKEND_URL` to your backend base URL, for example `https://api.example.com`.
- Vercel will serve the HTML file as the root page and proxy `/api/*` requests to your backend.

## Telegram Mini App
- In BotFather, set the Web App URL to your Vercel domain, for example `https://your-project.vercel.app`.
- The frontend will call `/api/*` on the same Vercel domain, and Vercel will forward those requests to the backend.
- For local file testing only, use the `?api=http://localhost:3001` override.
