import { Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email can\'t be blank'],
    lowercase: true,
    index: {
      unique: true,
      dropDups: true
    }
  },
  password: {
    type: String,
    required: [true, 'Password can\'t be blank']
  }
});

export default mongoose.model('User', userSchema);
