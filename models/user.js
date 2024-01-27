import mongoose from 'mongoose';

// user model
const { Schema } = mongoose;
const socialSchema = new Schema({
  facebook: {type: String, required: false},
  twitter: {type: String, required: false},
  linkedin: {type: String, required: false},
  github: {type: String, required: false},
  instagram: {type: String, required: false},
  blog: {type: String, required: false},
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, max: 30 },
  password: { type: String, required: true, max: 100 },
  email: String,
  created: { type: Date, default: Date.now },
  avatar: String,
  caption: { type: String, required: false, default: 'Hello World!', max: 40 },
  bio: { type: String, required: false, default: 'This is my bio.', max: 200 },
  role: { type: String, default: 'user' },
  refreshToken: String,
  currentClasses: {type: [String], required: false, max: 10},
  program: {type: String, required: false, max: 50},
  admissionDate: {type: String, required: false, max: 50},
  socialLinks: {type: socialSchema, required: false},
});

const User = mongoose.model('User', userSchema);

export default User;
