import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import ShortUniqueId from 'short-unique-id';
import crypto from 'crypto';
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
  createResetEmailToken(): void;
  passwordResetToken: String;
  passwordResetExpires: Date;
  profilePhoto: string;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    select: false,
  },
  removed: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  loggedSession: {
    type: [String],
    default: [],
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
  profilePhoto: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  },
});

userSchema.pre('save', function () {
  this.name = this.name.replace(/\b\w/g, (char) => char.toUpperCase());
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

userSchema.methods.createResetEmailToken = function () {
  const resetEmailToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetEmailToken).digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetEmailToken;
};

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
