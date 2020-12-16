import mongoose from 'mongoose';
import mongoTenant from 'mongo-tenant';
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

brandSchema.plugin(jsonSelect, '_id name active tenantId');
brandSchema.plugin(mongoTenant);

export default mongoose.model('Brand', brandSchema);
