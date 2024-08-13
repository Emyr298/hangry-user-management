import http from 'http';
import { extractPath, getJsonBody } from '../utils/requests';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../services/users';
import { validateUserForm } from '../forms/user-form';
import { jsonResponse } from '../utils/responses';

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
  
  return jsonResponse(res, 400, {
    message: 'invalid route',
  });
};

const getAllUsersRoute = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  return jsonResponse(res, 200, {
    users: await getAllUsers(),
  });
};

const createUserRoute = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  const body = await getJsonBody(req);
  try {
    const userData = validateUserForm(body);
    const user = await createUser(userData);
    return jsonResponse(res, 201, {
      message: 'user created successfully',
      user: user,
    });
  } catch (err) {
    const error = err as Error;
    let errorMessage = 'cannot save data to database';
    if (error.message.includes("duplicate")) {
      errorMessage = 'email is already registered';
    }
    return jsonResponse(res, 400, {
      message: errorMessage,
    });
  }
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
    return jsonResponse(res, 400, {
      message: error.message,
    });
  }
  return jsonResponse(res, 200, {
    user: user,
  });
};

const updateUserRoute = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  const path = extractPath(req.url!);
  const userId = path.split('/')[3];

  const body = await getJsonBody(req);

  try {
    const userData = validateUserForm(body);
    const user = await updateUser(userId, userData);
    return jsonResponse(res, 200, {
      message: 'user updated successfully',
      user: user,
    });
  } catch (err) {
    const error = err as Error;
    let errorMessage = 'cannot save data to database';
    if (error.message.includes("duplicate")) {
      errorMessage = 'email is already registered';
    }
    return jsonResponse(res, 400, {
      message: errorMessage,
    });
  }
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
    return jsonResponse(res, 400, {
      message: error.message,
    });
  }
  return jsonResponse(res, 204);
};
