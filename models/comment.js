// Importing mongoose, a package used for modeling and mapping MongoDB data to javascript
import mongoose from "mongoose";

// Destructuring Schema from mongoose for defining new schemas.
const { Schema } = mongoose;
// Creating a new schema for comments. This defines the structure and data types of a comment in the database.
const commentSchema = new Schema({
  // userId: Reference to a User model, indicating who made the comment.
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // text: String data type to store the comment's text.
  text: String,

  // created: Date type with a default value of the current time. It records when the comment was created.
  created: { type: Date, default: Date.now },

  // postId: Reference to a Post model, indicating to which post the comment belongs.
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },

  // parentId: Optional reference to another Comment model. This is for replies to a comment, with default as null for top-level comments.
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
});

// Creating a Comment model from the commentSchema to interact with the 'comments' collection in the database.
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
