# 🔥 Roast My Code

Paste code, get brutally honest AI feedback. Powered by Claude.

## Deploy to Vercel (5 minutes)

### Step 1 — Get a free Vercel account
Go to https://vercel.com and sign up (use "Continue with GitHub" for easiest setup).

### Step 2 — Install Vercel CLI
```bash
npm install -g vercel
```

### Step 3 — Deploy
In this folder, run:
```bash
vercel
```
Follow the prompts (all defaults are fine). It will give you a live URL.

### Step 4 — Add your Anthropic API key
1. Go to https://vercel.com/dashboard
2. Click your project → Settings → Environment Variables
3. Add:
   - Name: `ANTHROPIC_API_KEY`
   - Value: your key from https://console.anthropic.com
4. Click Save, then redeploy: `vercel --prod`

That's it — your app is live! 🎉

## Project structure
```
roast-my-code/
├── index.html        # The app
├── api/
│   └── roast.js      # Serverless function (keeps API key secret)
└── vercel.json       # Vercel config
```

## Get an Anthropic API key
Sign up at https://console.anthropic.com, go to API Keys, and create one.
