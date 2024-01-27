import mongoose from "mongoose";
import slugify from "slugify";
import dotenv from "dotenv";
import Post from "./models/post.js";
import Tag from "./models/tag.js";

dotenv.config();

// Connect to MongoDB
const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// Update the Post schema to include the following fields:
// mongoose.connection.once('open', async function() {
//   const cursor = Post.find({}).cursor();
//   for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
//     doc.slug = slugify(doc.title, { lower: true, strict: true });
//     doc.is_stickied = false;
//     doc.is_visible = true;
//     doc.is_deleted = false;
//     await doc.save();
//   }
//   console.log('Done!');
// })
//

// Update the Tag schema to include the following fields:
const RANDOM_TAGS = ['python', 'java', 'leetcode', 'aws', 'react', 'javascript', 'hike'];

mongoose.connection.once('open', async function() {
  // Create and save tags if they don't exist yet
  const savedTags = await Promise.all(
    RANDOM_TAGS.map(async (tagName) => {
      let tag = await Tag.findOne({ name: tagName });
      if (!tag) {
        tag = new Tag({ name: tagName });
        await tag.save();
      }
      return tag;
    })
  );

  const cursor = Post.find({}).cursor();

  for (let post = await cursor.next(); post !== null; post = await cursor.next()) {
    const tagSubset = savedTags.sort(() => 0.5 - Math.random()).slice(0, Math.ceil(Math.random() * 3)); 
    // Assign tags to each post
    tagSubset.map((tag) => post.tags.push(tag._id));
    await post.save();
  }

  console.log('Posts updated successfully with tags');
});
