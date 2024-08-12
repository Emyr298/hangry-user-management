import http from 'http';
import { extractPath, getJsonBody } from '../utils';
import { getAllUsers } from '../repository/users';

export const handleUsersRoute = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  const path = extractPath(req.url!);
  
  if (path.match(/^\/api\/users$/) && req.method! == 'GET') {
    return await getAllUsersRoute(req, res);
  } else if (path.match(/^\/api\/users$/) && req.method! == 'POST') {
    return await createUserRoute(req, res);
  } else if (path.match(/^\/api\/users\/[a-zA-Z0-9-]+$/) && req.method! == 'GET') {
    return await getUserRoute(req, res);
  } else if (path.match(/^\/api\/users\/[a-zA-Z0-9-]+$/) && req.method! == "PUT") {
    return await updateUserRoute(req, res);
  } else if (path.match(/^\/api\/users\/[a-zA-Z0-9-]+$/) && req.method! == "DELETE") {
    return await deleteUserRoute(req, res);
  }
  
  return res
    .writeHead(400, {"Content-Type": "application/json"})
    .end(JSON.stringify({
      "message": "invalid route",
    }));
};

const getAllUsersRoute = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  return res
    .writeHead(200, {"Content-Type": "application/json"})
    .end(JSON.stringify({
      "users": getAllUsers(),
    }));
};

const createUserRoute = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  
};

const getUserRoute = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  
};

const updateUserRoute = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  
};

const deleteUserRoute = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  
};
