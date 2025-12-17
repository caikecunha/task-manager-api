import mongoose from 'mongoose';
import 'dotenv/config';

export const mongoConnect = async () => {
    await mongoose.connect(process.env.URI_MONGO_ATLAS);
};
