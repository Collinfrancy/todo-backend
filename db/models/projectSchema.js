import { Schema, model } from 'mongoose';

const todoItemSchema = new Schema({
  todo: { type: String }, // 'aa' or 'bb' in your data
  checked: { type: Boolean, default: false }, // false in your data
});

const schema = Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    items: [todoItemSchema],
  },
  { timestamps: true }
);
const Project = model('Project', schema);
export default Project;
