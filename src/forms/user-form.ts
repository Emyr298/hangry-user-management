export interface UserForm {
  name: string
  email: string
  birthdate: Date
}

export const validateUserForm = (obj: any): UserForm => {
  if (typeof obj !== 'object') {
    throw new Error('invalid object');
  }
  if (!obj.name || typeof obj.name !== 'string') {
    throw new Error('name must be a string');
  }
  if (!obj.email || typeof obj.email !== 'string' || !obj.email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
    throw new Error('email must be in email format');
  }
  if (!obj.birthdate || typeof obj.birthdate !== 'string' || isNaN(Number(new Date(obj.birthdate)))) {
    throw new Error('birthdate must be in a date format');
  }
  return {
    name: obj.name,
    email: obj.email,
    birthdate: new Date(obj.birthdate),
  }
};
