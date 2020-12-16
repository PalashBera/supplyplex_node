import mongoose from 'mongoose';

const { Schema } = mongoose;

const companySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name can\'t be blank']
  }
});

export default mongoose.model('Company', companySchema);
