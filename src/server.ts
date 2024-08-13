import 'dotenv/config';
import './database';

import http from 'http';
import { handleUsersRoute } from './routes/users';

const port = 3000;
const server = http.createServer(async (req, res) => {
  if (!req.url || !req.method) {
    return res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'invalid url',
      }),
    );
  }

  try {
    if (req.url.startsWith('/api/users')) {
      return await handleUsersRoute(req, res);
    }
  } catch {
    return res.writeHead(500, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: 'internal server error',
      }),
    );
  }

  return res.writeHead(400, { 'Content-Type': 'application/json' }).end(
    JSON.stringify({
      message: 'invalid url',
    }),
  );
});

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
