import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';
dotenv.config({ path: '.env' });

const connectDB = async () => {
  await mongoose.connect(process.env.URI);
  console.log('DB connected');
};
try {
  connectDB();
} catch (err) {
  console.log(err);
}

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
