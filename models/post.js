import mongoose from 'mongoose';
import slugify from 'slugify';

// Define the schema for the Story model
const { Schema } = mongoose;
const postSchema = new Schema({
  title: String,
  slug: { type: String, unique: true },
  url: String,
  text: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  commentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  // favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  is_stickied: { type: Boolean, default: false },
  is_visible: { type: Boolean, default: true },
  is_deleted: { type: Boolean, default: false },
});

postSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

// Create the Post model using the schema
const Post = mongoose.model('Post', postSchema,);

export default Post;
