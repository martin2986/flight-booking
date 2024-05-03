import jwt from 'jsonwebtoken';
export const capitalize = (name: string) => {
  return name.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const generateJWT = function (payload: { id: string }): string {
  const privateKey: any = process.env.JWT_SECRET;
  return jwt.sign(payload, privateKey, { expiresIn: process.env.JWT_EXPIRES_IN });
};
