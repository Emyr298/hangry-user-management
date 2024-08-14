import 'dotenv/config';
import './database';

import http from 'http';
import { handleUsersRoute } from './routes/users';
import { jsonResponse } from './utils/responses';

const port = 3000;
const server = http.createServer(async (req, res) => {
  if (!req.url || !req.method) {
    return jsonResponse(res, 400, {
      error: 'invalid url',
    });
  }

  try {
    if (req.url.startsWith('/api/users')) {
      return await handleUsersRoute(req, res);
    }
  } catch {
    return jsonResponse(res, 500, {
      error: 'internal server error',
    });
  }

  return jsonResponse(res, 400, {
    error: 'Invalid url. User management is located at /api/users. Refer to README.md for API documentations.',
  });
});

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
