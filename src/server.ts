import http from 'http';
import { handleUsersRoute } from './routes/users';

const port = 3000;
const server = http.createServer((req, res) => {
  if (!req.url || !req.method) {
    res.writeHead(400, {"Content-Type": "application/json"});
    return res.end(JSON.stringify({
      "message": "invalid url",
    }));
  }
  
  if (req.url.startsWith("/api/users")) {
    return handleUsersRoute(req, res);
  }
  
  res.writeHead(400, {"Content-Type": "application/json"});
  return res.end(JSON.stringify({
    "message": "invalid url",
  }));
});

server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
