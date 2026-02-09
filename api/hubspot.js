// Vercel Serverless Function to proxy HubSpot API requests
// Supports GET and POST (search endpoints need POST), Bearer token auth

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET and POST
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { endpoint } = req.query;

    if (!endpoint) {
      res.status(400).json({ error: 'Missing endpoint parameter' });
      return;
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: 'Missing Authorization header' });
      return;
    }

    const hubspotUrl = `https://api.hubapi.com/${endpoint}`;

    console.log('Proxying request to:', hubspotUrl, 'method:', req.method);

    const fetchOptions = {
      method: req.method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': authHeader
      }
    };

    if (req.method === 'POST' && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(hubspotUrl, fetchOptions);
    const data = await response.json();

    res.status(response.status).json(data);

  } catch (error) {
    console.error('HubSpot proxy error:', error);
    res.status(500).json({
      error: 'Proxy request failed',
      message: error.message
    });
  }
}
