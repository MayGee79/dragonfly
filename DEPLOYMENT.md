# Deployment Guide

This guide explains how to set up automated deployment to 123.reg via FTP.

## Prerequisites

1. FTP credentials from 123.reg:
   - FTP Server (hostname)
   - FTP Username
   - FTP Password
   - FTP Directory (usually `/` or `/public_html`)

2. GitHub repository for the project

## Setup Steps

### 1. Add GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add:

- `FTP_SERVER`: Your FTP server hostname (e.g., `ftp.yourdomain.com`)
- `FTP_USERNAME`: Your FTP username
- `FTP_PASSWORD`: Your FTP password

### 2. Configure Deployment Directory

If your files need to go to a specific directory (not root), update `.github/workflows/deploy.yml`:

```yaml
server-dir: /public_html/  # or your specific directory
```

### 3. Push to Main Branch

Once secrets are configured, pushing to the `main` branch will automatically:
1. Build the static site
2. Deploy to 123.reg via FTP

## Manual Deployment

If you prefer manual deployment:

```bash
npm run build
# Then upload the contents of the `out/` directory to your FTP server
```

## Troubleshooting

- **Build fails**: Check that all dependencies are installed (`npm install`)
- **FTP connection fails**: Verify credentials in GitHub Secrets
- **Files not appearing**: Check the `server-dir` path matches your hosting setup

