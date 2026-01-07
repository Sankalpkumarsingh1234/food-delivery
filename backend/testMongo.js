import mongoose from 'mongoose';

const uri = "mongodb+srv://1:1@cluster0.h31oacv.mongodb.net/?appName=Cluster0";

async function test() {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connection successful');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('MongoDB connection error:');
    console.error(err);
    process.exit(1);
  }
}

test();
