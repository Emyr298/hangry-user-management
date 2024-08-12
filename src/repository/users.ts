import { UserForm } from '../forms/user-form';
import { User } from '../models/user';
import { v4 as uuid } from 'uuid';

const users: User[] = [
  {
    id: 'ASDASD',
    name: 'ASDASDASD',
    email: 'asd@asd.com',
    birthdate: new Date(),
  },
];

export const getAllUsers = () => {
  return users;
};

export const getUserById = (userId: string) => {
  const user = users.find((user) => {
    return user.id === userId;
  });
  if (!user) {
    throw new Error('user not found');
  }
  return user;
};

export const createUser = (user: UserForm) => {
  const id = uuid();
  users.push({
    id: id,
    ...user,
  });
};

export const deleteUser = (userId: string) => {
  const userIdx = getUserIndex(userId);
  users.splice(userIdx, 1);
};

export const updateUser = (userId: string, userData: UserForm) => {
  const userIdx = getUserIndex(userId);
  const oldUser = users[userIdx];
  users[userIdx] = {
    id: oldUser.id,
    ...userData,
  }
};

const getUserIndex = (userId: string) => {
  const userIdx = users.findIndex((user) => {
    return user.id === userId;
  });
  if (userIdx < 0) {
    throw new Error('user not found');
  }
  return userIdx;
};
