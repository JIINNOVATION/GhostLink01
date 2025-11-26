GhostLink Cloud API

This small Node/Express service exposes two endpoints used by the GhostLink frontend:
- POST /api/generate-image  -> { prompt }
  - Returns: { image: "data:image/png;base64,..." }

- POST /api/ask-historian -> { question, context, locationName }
  - Returns: { text, citations }

The service uses the `@google/genai` client. It accepts the Gemini API key via the `GEMINI_API_KEY` environment variable.

Quick local run

1. Install deps

```bash
cd cloud-api
npm ci
```

2. Run locally

```bash
export GEMINI_API_KEY="your-key-here"
node index.js
# server listens on http://localhost:8080
```

Deploy to Google Cloud Run (recommended)

1. Enable required APIs (run once):

```bash
gcloud services enable run.googleapis.com artifacts.googleapis.com secretmanager.googleapis.com cloudbuild.googleapis.com
```

2. Build and push image using Cloud Build:

```bash
# Set your GCP project
gcloud config set project YOUR_PROJECT_ID

# Build and push
gcloud builds submit --tag gcr.io/$GOOGLE_CLOUD_PROJECT/ghostlink-cloud-api
```

3. Create a Secret in Secret Manager (recommended) and grant access to Cloud Run runtime service account:

```bash
# Create secret
printf "%s" "YOUR_GEMINI_KEY" | gcloud secrets create GEMINI_API_KEY --data-file=-

# Grant access to Cloud Run runtime service account (replace PROJECT_NUMBER)
gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
  --member=serviceAccount:YOUR_PROJECT_NUMBER-compute@developer.gserviceaccount.com \
  --role=roles/secretmanager.secretAccessor
```

4. Deploy to Cloud Run and attach the secret as an environment variable:

```bash
gcloud run deploy ghostlink-cloud-api \
  --image gcr.io/$GOOGLE_CLOUD_PROJECT/ghostlink-cloud-api \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --set-secrets=GEMINI_API_KEY=GEMINI_API_KEY:latest
```

Notes
- If you prefer not to use Secret Manager, you can pass `--set-env-vars=GEMINI_API_KEY=...` but that stores the key in the Cloud Run service config (less ideal).
- Consider restricting who can invoke the Cloud Run service (remove `--allow-unauthenticated`) and use a short-lived signed token from your frontend.
- After deployment, update the frontend to call the Cloud Run URL (e.g., `https://ghostlink-cloud-api-<hash}-uc.a.run.app/api/generate-image`).
