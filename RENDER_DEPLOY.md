# Deploy to Render

This guide walks you through deploying the GhostLink API backend to [Render](https://render.com) in ~5 minutes.

## Prerequisites

1. **Render account**: Sign up free at [render.com](https://render.com)
2. **GitHub repo**: Your repo is already pushed (`JIINNOVATION/GhostLink01`)
3. **Gemini API Key**: You have your `GEMINI_API_KEY` ready (from Google AI Studio or Google Cloud)

## Step 1: Connect GitHub to Render

1. Go to [render.com](https://render.com) and sign up or log in
2. Click **"+ New +"** in the top right → **"Web Service"**
3. Select **"Connect a repository"** and authorize GitHub
4. Find and select `GhostLink01`
5. If `GhostLink01` doesn't appear, click **"Configure GitHub app"** to grant broader permissions

## Step 2: Configure the Service

After selecting the repo:

| Field | Value |
|-------|-------|
| **Name** | `ghostlink-api` (or any name you prefer) |
| **Environment** | `Docker` |
| **Region** | Choose closest to you (e.g., `Ohio` for US East) |
| **Branch** | `main` |
| **Root Directory** | `cloud-api` |

## Step 3: Add Environment Variables

1. Scroll to **"Environment"** section
2. Click **"Add Environment Variable"** and add:

   ```
   GEMINI_API_KEY = <your-actual-gemini-api-key>
   GITHUB_PAGES_URL = https://jiinnovation.github.io/GhostLink01
   ```

3. If you want to test with a different GitHub Pages repo, update `GITHUB_PAGES_URL` (e.g., for a fork)

## Step 4: Deploy

1. Click **"Create Web Service"**
2. Render builds and deploys automatically (~2–3 min)
3. You'll see logs showing the build progress
4. Once deployed, you'll get a URL like `https://ghostlink-api.onrender.com`

## Step 5: Test the Backend

Open in a browser or curl:

```bash
curl https://ghostlink-api.onrender.com/health
# Should return: {"status":"ok"}

curl https://ghostlink-api.onrender.com/api/debug
# Should return: {"status":"ok","hasGeminiKey":true,"githubPagesUrl":"https://jiinnovation.github.io/GhostLink01","nodeEnv":"production"}
```

If `hasGeminiKey` is `false`, the `GEMINI_API_KEY` env var wasn't set correctly. Go back to Render dashboard → Settings → Environment and fix it.

## Step 6: Update GitHub Secrets and Redeploy Frontend

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Create or update the secret:
   - **Name**: `REMOTE_API_URL`
   - **Value**: `https://ghostlink-api.onrender.com` (or your Render service URL)
3. Go to **Actions** tab and click **"Build and Deploy to GitHub Pages"** workflow
4. Click **"Run workflow"** → select branch `main` → **"Run workflow"**
5. Wait for it to complete (frontend rebuilds with the backend URL baked in)

## Step 7: Test End-to-End

1. Open your site: `https://jiinnovation.github.io/GhostLink01/`
2. Try the **Historian** feature (ask a question about a location)
3. Try the **Image Generation** feature (generate an image from a prompt)
4. Both should now work!

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Render deploy fails with "Docker build error" | Check `cloud-api/Dockerfile` and `cloud-api/package.json` exist; push to GitHub and retry |
| `/api/debug` returns `hasGeminiKey: false` | Go to Render Settings → Environment; verify `GEMINI_API_KEY` is set correctly (not blank) |
| Frontend features still don't work | Verify `REMOTE_API_URL` secret is set; re-run the GitHub Actions workflow; check browser console for network errors |
| CORS error in browser console | Ensure `GITHUB_PAGES_URL` env var on Render matches your actual GitHub Pages URL |
| "Free instance resets" message on Render | Render free tier has monthly limits; upgrade to Paid or use another host (e.g., Vercel, Google Cloud Run) |

## Optional: Custom Domain

If you want a prettier URL (e.g., `api.example.com`):

1. On Render dashboard, go to your service
2. Click **"Settings"** → **"Custom Domain"**
3. Add your domain and follow DNS instructions

## Next Steps

- **Monitor logs**: In Render dashboard, click your service → **"Logs"** to see requests and errors
- **Add rate-limiting**: If you want to prevent abuse, add middleware (I can help)
- **Upgrade plan**: Free tier can handle ~1k requests/day; Paid tier for production use

## Helpful Links

- [Render Docker Deployment Docs](https://render.com/docs/deploy-docker)
- [Render Environment Variables](https://render.com/docs/environment-variables)
- [Google Gemini API Setup](https://ai.google.dev/tutorials/quickstart)
