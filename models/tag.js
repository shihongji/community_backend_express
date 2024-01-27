import mongoose from 'mongoose';

const { Schema } = mongoose;
const tagSchema = new Schema({
  name: {type: String, required: true},
  description: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
