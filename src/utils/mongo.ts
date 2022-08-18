import mongoose from 'mongoose';
import config from 'config';

const dbUri = config.get<string>('dbUri');

export default async function connectDB() {
  try {
    await mongoose.connect(dbUri);
    console.log('MONGODB database connected successfully....');
  } catch (error) {
    console.log('MONGODB database could not connect....');
    console.error(error);
    process.exit(1);
  }
}
