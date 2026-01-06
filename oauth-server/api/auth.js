export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user`;
  res.redirect(authUrl);
}

