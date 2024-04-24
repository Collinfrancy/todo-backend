import express from 'express';
import User from '../../db/models/userSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Project from '../../db/models/projectSchema.js';
const router = express.Router();

router.post('/signup', async (req, res) => {
  const body = { ...req.body };
  const user = await User.findOne({ email: body.email });
  if (user) {
    return res.status(400).json({ erroor: 'email already exists' });
  }
  if (body.password != body.confirmPassword) {
    return res.status(400).json({ error: 'Password doesss not match' });
  }
  const hashedPassword = await bcrypt.hash(body.password, 2);
  body.password = hashedPassword;
  const newUser = await User.create(body);
  return res
    .status(200)
    .json({ message: 'sign up successfull', user: newUser });
});

router.post('/login', async (req, res) => {
  const body = { ...req.body };
  const user = await User.findOne({ email: body.email });
  if (!user) {
    return res.status(400).json({ error: 'Email or password incorrect!!' });
  }
  const isMatching = await bcrypt.compare(body.password, user.password);
  if (!isMatching) {
    return res.status(400).json({ error: 'email or password incorrect!!' });
  }
  const key = process.env.SECRET_KEY;
  const token = jwt.sign({ role: 'USER', id: user._id }, key, {
    expiresIn: '7d',
  });
  res.status(200).json({ message: 'Login Successfull', token });
});

router.post('/todo', async (req, res) => {
  console.log(req.body);
  const body = { ...req.body };
  const todos = await Project.create(body);
  res.status(200).json({ message: 'Slot is added', todo: todos });
});
//..
router.get('/listing', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/viewdetails/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const projects = await Project.findById(id);
    res.status(200).json(projects);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.patch('/tick/:id', async (req, res) => {
  // const { checked } = req.params;
  const { id } = req.params;

  const indexxx = await Project.findOneAndUpdate(
    { 'items._id': id },
    { $set: { 'items.$.checked': true } },
    { new: true }
  );

  res.status(200).json(indexxx);
});

export default router;
