import { Schema, model } from 'mongoose';

const schema = Schema(
  {
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: Boolean,
      trim: true,
    },
  },
  { timestamps: true }
);
const Todo = model('Todo', schema);
export default Todo;
