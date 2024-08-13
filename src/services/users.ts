import { database } from '../database';
import { UserForm } from '../forms/user-form';
import { User } from '../models/user';

export const getAllUsers = async () => {
  const userRepository = database.getRepository(User);
  return await userRepository.find();
};

export const getUserById = async (userId: string) => {
  const userRepository = database.getRepository(User);
  const user = await userRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new Error('user not found');
  }
  return user;
};

export const createUser = async (userData: UserForm) => {
  const user = new User();
  user.name = userData.name;
  user.email = userData.email;
  user.birthdate = userData.birthdate;
  return await database.manager.save(user);
};

export const deleteUser = async (userId: string) => {
  const userRepository = database.getRepository(User);
  await userRepository.delete({
    id: userId,
  });
};

export const updateUser = async (userId: string, userData: UserForm) => {
  const userRepository = database.getRepository(User);
  const user = await userRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new Error('user not found');
  }

  user.name = userData.name;
  user.email = userData.email;
  user.birthdate = userData.birthdate;
  return await userRepository.save(user);
};
