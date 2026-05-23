// Vercel Serverless Function — wraps the TanStack Start SSR server bundle

import server from "../dist/server/server.js";

export default async function handler(req, res) {
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const proto = req.headers["x-forwarded-proto"] || "https";
  const url = `${proto}://${host}${req.url}`;

  // Build a Fetch-API Request from the Node.js IncomingMessage
  const headers = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (value !== undefined) {
      headers[key] = Array.isArray(value) ? value.join(", ") : value;
    }
  }

  const fetchRequest = new Request(url, {
    method: req.method || "GET",
    headers,
  });

  // Run the SSR handler
  const response = await server.fetch(fetchRequest);

  // Forward status + headers
  res.status(response.status);
  for (const [key, value] of response.headers.entries()) {
    if (key.toLowerCase() !== "transfer-encoding") {
      res.setHeader(key, value);
    }
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  res.end(buffer);
}
