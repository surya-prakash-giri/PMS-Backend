import mongoose from "mongoose";

const DB_NAME = 'PMS';
const MONGO_URI = process.env.MONGO_DB_URI || `mongodb://0.0.0.0:27017/${DB_NAME}`;

const mongoConnect = async () => {
    let db;
    try {
      await mongoose.connect(MONGO_URI);
      db = mongoose.connection;
    } catch (err) {
        (db) && db.close();
        console.log('Error at dbConnect ::', err)
        throw err;
    }
}

mongoConnect()
    .then(res => console.log('Connected Successfully to MongoDB'))
    .catch(err => console.log('Err at Call ::', err));