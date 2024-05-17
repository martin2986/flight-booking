import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
export const capitalize = (name: string) => {
  return name.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const generateJWT = function (payload: { id: mongoose.Types.ObjectId }): string {
  const privateKey: any = process.env.JWT_SECRET;
  return jwt.sign(payload, privateKey);
};

export const expiryDate = new Date(Date.now() + 3600000);