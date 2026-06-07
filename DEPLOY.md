# Killian Fit Durable Deploy Guide

This folder is a static PWA-ready app. Deploy the whole `killian-fit` folder, then connect Supabase from the app's Settings screen.

## 1. Create the Supabase Backend

1. Go to https://supabase.com/dashboard and create a new project.
2. Open SQL Editor.
3. Paste and run the contents of `supabase-schema.sql`.
4. Open Project Settings, then API.
5. Copy your Project URL.
6. Copy your publishable key or anon public key.
7. In Authentication settings, choose whether email confirmations should be on or off.

The SQL creates one table: `public.killian_fit_snapshots`. Row Level Security is enabled so each signed-in user can only read, create, or update their own snapshot.

## 2. Put the App in GitHub

1. Create a new GitHub repository named `killian-fit`.
2. Upload everything in this folder:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `manifest.webmanifest`
   - `service-worker.js`
   - `icons/`
   - `supabase-schema.sql`
3. Commit the files to the `main` branch.

## 3. Deploy with Netlify

1. Go to https://app.netlify.com.
2. Choose Add new site, then Import from Git.
3. Pick the `killian-fit` GitHub repository.
4. Leave build command blank.
5. Set publish directory to `/` unless you put the files in a subfolder.
6. Deploy the site.

## 4. Connect Supabase in the App

1. Open your deployed Netlify URL.
2. Go to Settings.
3. Paste the Supabase Project URL.
4. Paste the publishable or anon key.
5. Save Supabase Project.
6. Create an account or sign in.
7. Tap Push to Cloud to upload your current local training data.

## 5. Install on iPhone

1. Open the deployed URL in Safari.
2. Tap Share.
3. Tap Add to Home Screen.
4. Name it Killian Fit.
5. Open it from your home screen.

## 6. Daily Use

- Log workouts normally.
- Use Push to Cloud after important sessions.
- Use Pull from Cloud on a new device after signing in.
- Export Data occasionally as a manual backup.

Progress photos are compressed before saving so the cloud snapshot stays manageable. If the photo library gets very large, move photos to Supabase Storage in a future version.
