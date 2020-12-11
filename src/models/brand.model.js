import mongoose from 'mongoose';
import jsonSelect from 'mongoose-json-select';

const { Schema } = mongoose;

const brandSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name can\'t be blank'],
    index: {
      unique: true,
      dropDups: true
    }
  },
  active: {
    type: Boolean,
    default: true
  }
});

brandSchema.plugin(jsonSelect, '_id name active');

export default mongoose.model('Brand', brandSchema);
