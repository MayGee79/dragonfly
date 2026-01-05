# GitHub Secrets Setup for Deployment

To enable automated deployment to 123.reg via FTP, you need to add secrets to your GitHub repository.

## Steps

1. **Go to GitHub Repository Settings**
   - Navigate to your repository on GitHub
   - Click on "Settings" tab
   - In the left sidebar, click "Secrets and variables" → "Actions"

2. **Add FTP Credentials**
   - Click "New repository secret"
   - Add the following three secrets:

   **Secret 1: FTP_SERVER**
   - Name: `FTP_SERVER`
   - Value: Your FTP server hostname (e.g., `ftp.yourdomain.com` or IP address)
   - Click "Add secret"

   **Secret 2: FTP_USERNAME**
   - Name: `FTP_USERNAME`
   - Value: Your FTP username
   - Click "Add secret"

   **Secret 3: FTP_PASSWORD**
   - Name: `FTP_PASSWORD`
   - Value: Your FTP password
   - Click "Add secret"

3. **Verify Secrets**
   - You should now see all three secrets listed
   - They will be masked (shown as `***`) for security

## How It Works

Once secrets are configured:
- Every push to the `main` branch triggers the GitHub Actions workflow
- The workflow builds the static site
- Files are automatically uploaded to your 123.reg hosting via FTP
- Your site is updated automatically

## Testing Deployment

1. Make a small change to your site
2. Commit and push to `main` branch
3. Go to your repository → "Actions" tab
4. Watch the deployment workflow run
5. Check your live site after completion

## Troubleshooting

- **"FTP connection failed"**: Verify your FTP credentials are correct
- **"Files not uploading"**: Check the `server-dir` in `.github/workflows/deploy.yml` matches your hosting directory
- **"Build failed"**: Check the Actions log for specific errors

## Security Notes

- Never commit FTP credentials to your repository
- Secrets are encrypted and only accessible during workflow runs
- If you need to update credentials, edit the secret in GitHub Settings

