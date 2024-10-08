import { validateDateString } from '../utils/date';

export interface UserForm {
  name: string;
  email: string;
  birthdate: string;
}

export const validateUserForm = (obj: any): UserForm => {
  if (typeof obj !== 'object') {
    throw new Error('invalid object');
  }

  const errors = [];
  if (!obj.name || typeof obj.name !== 'string') {
    errors.push('name must be a string');
  }
  if (
    !obj.email ||
    typeof obj.email !== 'string' ||
    !obj.email.match(/^[^@]+@[^@]+\.[^@]+$/)
  ) {
    errors.push('email is in invalid format');
  }
  if (
    !obj.birthdate ||
    typeof obj.birthdate !== 'string' ||
    !validateDateString(obj.birthdate)
  ) {
    errors.push('birthdate must be in a date format');
  }
  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }
  return obj as UserForm;
};
