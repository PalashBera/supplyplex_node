import mongoose from 'mongoose';
import mongoTenant from 'mongo-tenant';
import jsonSelect from 'mongoose-json-select';

const { Schema } = mongoose;

const categorySchema = new Schema({
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

categorySchema.plugin(jsonSelect, '_id name active tenantId');
categorySchema.plugin(mongoTenant);

export default mongoose.model('Category', categorySchema);
