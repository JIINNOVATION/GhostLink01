Deploying GhostLink Cloud API to Render

This file explains how to deploy the `cloud-api` Express service to Render (simpler alternative to Cloud Run).

1. Create an account at https://render.com and connect your GitHub account.

2. Create a new **Web Service**:
   - Click "New" → "Web Service" → Connect a repository.
   - Select `JIINNOVATION/GhostLink01` and branch `main`.
   - Set the "Root Directory" to `cloud-api`.
   - For "Environment", choose `Docker` (Render will use the provided `Dockerfile`).
   - Leave the default build and start commands.

3. Add environment variables:
   - In the new service, go to "Environment" → "Environment Variables" → Add a variable:
     - Key: `GEMINI_API_KEY`
     - Value: your Gemini API key

4. Deploy and wait for the service to become `Live`.

5. After deployment, note the public URL (e.g. `https://ghostlink-cloud-api.onrender.com`).

6. Update the frontend to use the Render API URL when building. Locally, create a `.env` with:

```bash
REACT_APP_REMOTE_API_URL=https://ghostlink-cloud-api.onrender.com
```

Then rebuild the frontend:

```bash
npm run build
```

If you host the frontend on Vercel or Netlify, add `REACT_APP_REMOTE_API_URL` as an environment variable in that host's project settings and trigger a redeploy.

Notes
- Render's free tier supports environment variables and public web services.
- You can also configure the `cloud-api` as a Node service (no Docker) by selecting the Node environment and setting `start` to `node index.js`.
- If you want, I can update the frontend to hard-code the Render URL once you share it, or leave it configurable via `REACT_APP_REMOTE_API_URL` as implemented.
