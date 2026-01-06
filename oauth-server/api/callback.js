export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code
      })
    });

    const data = await response.json();

    if (data.error) {
      res.status(400).send(`Error: ${data.error_description}`);
      return;
    }

    const content = `
<!DOCTYPE html>
<html>
<head>
  <title>Authorizing...</title>
</head>
<body>
  <script>
    (function() {
      const token = ${JSON.stringify(data)};
      const message = 'authorization:github:success:' + JSON.stringify(token);
      window.opener.postMessage(message, '*');
      window.close();
    })();
  </script>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.send(content);
  } catch (error) {
    res.status(500).send('Authentication failed');
  }
}

