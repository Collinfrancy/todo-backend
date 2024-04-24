import { Schema, model } from 'mongoose';

const schema = Schema(
  {
    name: {
      type: String,
      trim: true,
      // required: true,
    },

    email: {
      type: String,
      unique: true,
      // required: true,
    },
    password: {
      type: String,
      // required: true,
    },
    image: {
      type: String,
      trim: true,
      // required: false,
    },
  },
  { timestamps: true }
);

const User = model('User', schema);
export default User;
