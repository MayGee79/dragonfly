# GitHub OAuth Setup for Decap CMS

To enable authentication for Decap CMS, you need to set up a GitHub OAuth App.

## Steps

1. **Create GitHub OAuth App**
   - Go to GitHub → Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"
   - Fill in:
     - **Application name**: Dragonfly Psychotherapy CMS
     - **Homepage URL**: https://dragonflypsychotherapy.co.uk
     - **Authorization callback URL**: https://dragonflypsychotherapy.co.uk/admin
   - Click "Register application"

2. **Get OAuth Credentials**
   - After creating the app, you'll see a **Client ID**
   - Click "Generate a new client secret" to get the **Client Secret**
   - Save both values securely

3. **Update Decap CMS Config**
   - Open `public/admin/config.yml`
   - Update the `repo` field with your GitHub username and repository name:
     ```yaml
     repo: your-username/your-repo-name
     ```

4. **Add OAuth Credentials**
   - The Client ID and Client Secret will be used by Decap CMS automatically
   - When users visit `/admin`, they'll be prompted to authenticate with GitHub
   - Only users with write access to the repository can edit content

## Alternative: Use Environment Variables

If you prefer not to hardcode the repo name, you can use environment variables:

```yaml
backend:
  name: github
  repo: ${GITHUB_REPO}
  branch: main
```

Then set `GITHUB_REPO=username/repo-name` in your environment.

## Testing

1. After setup, visit `https://your-site.com/admin`
2. You should see a "Login with GitHub" button
3. After authenticating, you'll be able to edit content

## Troubleshooting

- **"Repository not found"**: Check that the repo name in config.yml matches your GitHub repository exactly
- **"OAuth error"**: Verify the callback URL matches exactly: `https://your-site.com/admin`
- **"Access denied"**: Ensure your GitHub account has write access to the repository

