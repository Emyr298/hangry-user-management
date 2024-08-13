import http from 'http';
import { extractPath, getJsonBody } from '../utils';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../services/users';
import { validateUserForm } from '../forms/user-form';

export const handleUsersRoute = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  const path = extractPath(req.url!);

  if (path.match(/^\/api\/users$/) && req.method! == 'GET') {
    return await getAllUsersRoute(req, res);
  } else if (path.match(/^\/api\/users$/) && req.method! == 'POST') {
    return await createUserRoute(req, res);
  } else if (
    path.match(/^\/api\/users\/[a-zA-Z0-9-]+$/) &&
    req.method! == 'GET'
  ) {
    return await getUserRoute(req, res);
  } else if (
    path.match(/^\/api\/users\/[a-zA-Z0-9-]+$/) &&
    req.method! == 'PUT'
  ) {
    return await updateUserRoute(req, res);
  } else if (
    path.match(/^\/api\/users\/[a-zA-Z0-9-]+$/) &&
    req.method! == 'DELETE'
  ) {
    return await deleteUserRoute(req, res);
  }

  return res.writeHead(400, { 'Content-Type': 'application/json' }).end(
    JSON.stringify({
      message: 'invalid route',
    }),
  );
};

const getAllUsersRoute = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  return res.writeHead(200, { 'Content-Type': 'application/json' }).end(
    JSON.stringify({
      users: await getAllUsers(),
    }),
  );
};

const createUserRoute = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  const body = await getJsonBody(req);
  let newUser = null;
  try {
    newUser = validateUserForm(body);
  } catch (err) {
    const error = err as Error;
    return res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: error.message,
      }),
    );
  }
  const user = await createUser(newUser);
  return res.writeHead(201, { 'Content-Type': 'application/json' }).end(
    JSON.stringify({
      message: 'user created successfully',
      user: user,
    }),
  );
};

const getUserRoute = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  const path = extractPath(req.url!);
  const userId = path.split('/')[3];
  let user = null;
  try {
    user = await getUserById(userId);
  } catch (err) {
    const error = err as Error;
    return res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: error.message,
      }),
    );
  }
  return res.writeHead(200, { 'Content-Type': 'application/json' }).end(
    JSON.stringify({
      user: user,
    }),
  );
};

const updateUserRoute = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  const path = extractPath(req.url!);
  const userId = path.split('/')[3];

  const body = await getJsonBody(req);

  let user = null;
  try {
    const newData = validateUserForm(body);
    user = await updateUser(userId, newData);
  } catch (err) {
    const error = err as Error;
    return res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: error.message,
      }),
    );
  }
  return res.writeHead(200, { 'Content-Type': 'application/json' }).end(
    JSON.stringify({
      message: 'user updated successfully',
      user: user,
    }),
  );
};

const deleteUserRoute = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  const path = extractPath(req.url!);
  const userId = path.split('/')[3];
  try {
    await deleteUser(userId);
  } catch (err) {
    const error = err as Error;
    return res.writeHead(400, { 'Content-Type': 'application/json' }).end(
      JSON.stringify({
        message: error.message,
      }),
    );
  }
  return res.writeHead(204, { 'Content-Type': 'application/json' }).end();
};
