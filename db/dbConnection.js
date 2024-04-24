import mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost:27017/todoDB2')
  .then(() => {
    console.log('DB Connected');
  })
  .catch(e => {
    console.log(e.message);
  });
export default mongoose;
