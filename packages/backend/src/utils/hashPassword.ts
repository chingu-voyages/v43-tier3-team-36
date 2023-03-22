import { hash, genSalt, compare } from 'bcrypt';

export const hashPassword = async (payload: string) => {
  const salt = await genSalt(10);
  const hashPassword = hash(payload, salt);

  return hashPassword;
};

export const comparePassword = async (
  uiPassword: string,
  dbPassword: string,
) => {
  const isMatch = await compare(uiPassword, dbPassword);
  return isMatch;
};
