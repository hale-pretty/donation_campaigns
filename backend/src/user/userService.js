import bcrypt from 'bcrypt';
import { uploadImage } from '../storage/index.js';
import jwt from 'jsonwebtoken';
import { models } from '../db/models.js';

const User = models.User;

const createUser = async (args) => {
  const { email, password, username } = args;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword, username });
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    bio: "",
    avatarUrl: "",
  }
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid password');
  }
  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: Number.parseInt(process.env.JWT_TOKEN_EXPIRATION_TIME_IN_SECONDS) });
  return {
    token
  };
};

const getUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
  };
};

const updateUser = async (id, args) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }
  let newPassword = null;
  if (args.password) {
    newPassword = await bcrypt.hash(args.password, 10);
  }

  const updateParams = {
    bio: args.bio ?? user.bio,
    password: newPassword ?? user.password,
  };
  await user.update(updateParams);
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
  };
};

const uploadAvatar = async (id, file) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }
  const avatarUrl = await uploadImage(file);
  await user.update({ avatarUrl });
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    bio: user.bio,
    avatarUrl,
  };
};

export { createUser, login, getUser, updateUser, uploadAvatar };
