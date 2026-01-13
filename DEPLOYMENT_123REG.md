# Deployment Guide for 123-reg

This guide explains how to set up automatic deployment to 123-reg hosting.

## How It Works

1. **Client publishes content** via admin panel (`yoursite.com/admin`)
2. **Changes are committed** to GitHub automatically
3. **GitHub Actions builds** the site and uploads to `/staging/` folder on 123-reg
4. **Old website stays live** at the root
5. **New site is accessible** at `yoursite.com/staging/` for testing
6. **When ready**, manually move files from `/staging/` to root (or use production workflow)

## Setup Steps

### Step 1: Get FTP Credentials from 123-reg

You'll need:
- **FTP Host** (e.g., `ftp.yoursite.com` or an IP address)
- **FTP Username**
- **FTP Password**
- **FTP Port** (usually 21 for FTP, 22 for SFTP)

### Step 2: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

   - **Name:** `FTP_HOST`
     **Value:** Your FTP host address

   - **Name:** `FTP_USERNAME`
     **Value:** Your FTP username

   - **Name:** `FTP_PASSWORD`
     **Value:** Your FTP password

### Step 3: Test the Workflow

1. Make a small change (or just push this workflow file)
2. Go to **Actions** tab in GitHub
3. Watch the workflow run
4. Check `yoursite.com/staging/` to see if it deployed

### Step 4: Deploy to Production (When Ready)

Once you've tested the staging site and it looks good:

**Option A: Manual (Safest)**
- Use FTP client to move files from `/staging/` to root folder
- Keep `/staging/` as backup

**Option B: Automated (We can set up later)**
- Create a separate workflow that deploys to root
- Trigger it manually when ready

## Important Notes

- **Old site is never touched** - it stays in root until you manually swap
- **Staging folder** (`/staging/`) is where all new deployments go
- **Test thoroughly** before moving to production
- **Keep backups** - the old site remains as backup until you replace it

## Troubleshooting

**Workflow fails?**
- Check GitHub Actions logs
- Verify FTP credentials are correct
- Ensure FTP access is enabled on 123-reg account

**Files not uploading?**
- Check folder permissions on 123-reg
- Verify the `server-dir` path is correct
- Some hosts require absolute paths (e.g., `/public_html/staging/`)

**Need to change the staging folder name?**
- Edit `.github/workflows/deploy-staging.yml`
- Change `server-dir: ./staging/` to your preferred folder name
