import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from "crypto";
import gravatar from "gravatar";
import { signToken } from '../services/jwtService.js'

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: String,
  passwordResetToken: String,
  passwordResetTokenExp: Date,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    // required: [true, 'Verify token is required'],
  },
}
);

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  if (this.isNew) {
    const emailHash = crypto.createHash("md5").update(this.email).digest("hex");
    
    this.avatarURL = gravatar.url(emailHash, { s: '200', d: 'identicon' }, true);
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  this.token = signToken(this.id);

  next();
});

userSchema.methods.checkUserPassword = (candidate, passwordHash) =>
  bcrypt.compare(candidate, passwordHash);

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetTokenExp = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export const User = model("User", userSchema);
