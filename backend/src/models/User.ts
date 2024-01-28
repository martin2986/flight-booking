import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import ShortUniqueId from 'short-unique-id';
const { randomUUID } = new ShortUniqueId({ length: 10 });

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  removed: boolean;
  created: Date;
  loggedSessions: string[];
  role: 'user' | 'admin';
  emailToken?: string;
  salt?: string;
  validPassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  removed: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  emailToken: String,
  loggedSession: {
    type: [String],
    default: [],
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
});

userSchema.pre('save', async function (next) {
  this.salt = randomUUID();
  this.password = await bcrypt.hashSync(this.password + this.salt);
  this.confirmPassword = undefined;
  next();
});

//checking if password is valid
userSchema.methods.validPassword = function (userPassword: string) {
  return bcrypt.compareSync(userPassword + this.salt, this.password);
};

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
