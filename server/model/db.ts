//import mongoose
import mongoose from 'mongoose';
import 'dotenv/config';
const MongoDB = process.env.MONGODB

//connect to mongoose
mongoose.connect(`mongodb://localhost:27017/${MongoDB}`)
    .then(() => console.log('connected to mongoose'));

//save connection as db
export const db = mongoose;

