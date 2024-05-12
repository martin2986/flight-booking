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

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
