import mongoose from 'mongoose';
import jsonSelect from 'mongoose-json-select';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
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

userSchema.plugin(jsonSelect, '_id email');

export default mongoose.model('User', userSchema);
