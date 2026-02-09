// Vercel Serverless Function to proxy Ticket Tailor API requests
// This bypasses CORS restrictions and forwards the Authorization header

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Get the endpoint from query parameter
    const { endpoint } = req.query;

    if (!endpoint) {
      res.status(400).json({ error: 'Missing endpoint parameter' });
      return;
    }

    // Get the Authorization header from the request
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: 'Missing Authorization header' });
      return;
    }

    // Construct the Ticket Tailor API URL
    const ticketTailorUrl = `https://api.tickettailor.com/v1/${endpoint}`;

    console.log('Proxying request to:', ticketTailorUrl);

    // Make the request to Ticket Tailor API
    const response = await fetch(ticketTailorUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': authHeader
      }
    });

    // Get the response data
    const data = await response.json();

    // Return the response with the same status code
    res.status(response.status).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({
      error: 'Proxy request failed',
      message: error.message
    });
  }
}
