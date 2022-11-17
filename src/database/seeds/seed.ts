import * as fs from 'fs';
import mongoose from 'mongoose';
import { UserSchema } from '../schemas';

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

mongoose.connect('mongodb://localhost:27017/cardgame').then(async () => {
  try {
    const User = mongoose.model('User', UserSchema);

    // DELETE PART

    await User.deleteMany();

    // IMPORT PART

    await User.create(users);

    console.log('Seeds ran successfully 🚀');
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();

    process.exit();
  }
});
