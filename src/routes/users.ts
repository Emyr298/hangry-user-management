import http from 'http';
import { extractPath } from '../utils';
import { getAllUsers } from '../repository/users';

export const handleUsersRoute = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const path = extractPath(req.url!);
  
  if (path.match(/^\/api\/users$/) && req.method! == 'GET') {
    return getAllUsersRoute(req, res);
  } else if (path.match(/^\/api\/users$/) && req.method! == 'POST') {
    return createUserRoute(req, res);
  } else if (path.match(/^\/api\/users\/[a-zA-Z0-9-]+$/) && req.method! == 'GET') {
    return getUserRoute(req, res);
  } else if (path.match(/^\/api\/users\/[a-zA-Z0-9-]+$/) && req.method! == "PUT") {
    return updateUserRoute(req, res);
  } else if (path.match(/^\/api\/users\/[a-zA-Z0-9-]+$/) && req.method! == "DELETE") {
    return deleteUserRoute(req, res);
  }
  
  return res
    .writeHead(400, {"Content-Type": "application/json"})
    .end(JSON.stringify({
      "message": "invalid route",
    }));
};

const getAllUsersRoute = (req: http.IncomingMessage, res: http.ServerResponse) => {
  return res
    .writeHead(200, {"Content-Type": "application/json"})
    .end(JSON.stringify({
      "users": getAllUsers(),
    }));
};

const createUserRoute = (req: http.IncomingMessage, res: http.ServerResponse) => {
  
};

const getUserRoute = (req: http.IncomingMessage, res: http.ServerResponse) => {
  
};

const updateUserRoute = (req: http.IncomingMessage, res: http.ServerResponse) => {
  
};

const deleteUserRoute = (req: http.IncomingMessage, res: http.ServerResponse) => {
  
};
