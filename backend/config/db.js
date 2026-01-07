import mongoose from 'mongoose';

const mangourl = process.env.MONGODB_URI || "mongodb+srv://1:1@cluster0.h31oacv.mongodb.net/?appName=Cluster0";

mongoose.connect(mangourl)
  .then(() => console.log("connected to mongo db"))
  .catch((err) => console.log(err));

export default mongoose;

