import dotenv from "dotenv";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Story from "./models/story.js";
import User from "./models/user.js";
import Comment from "./models/comment.js";
import Category from "./models/category.js";

dotenv.config();
const { DB_URI } = process.env;
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function populateDummyData() {
  // Generate categories
  const categoryNames = [
    "Job",
    "CampusLife",
    "Event",
    "Course",
    "Other",
    "Hobby",
  ];
  const categories = [];
  for (let name of categoryNames) {
    const category = new Category({
      name: name,
      description: `This is ${name}`,
    });
    await category.save();
    categories.push(category);
  }

  // Generate users
  const users = [];
  for (let i = 0; i < 10; i++) {
    const user = new User({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar(),
      bio: faker.lorem.sentence(3),
      role: "user",
    });
    await user.save();
    users.push(user);
  }

  // Generate stories
  const stories = [];
  for (let user of users) {
    for (let i = 0; i < 10; i++) {
      const story = new Story({
        author: user.username,
        title: faker.lorem.sentence(),
        url: faker.internet.url(),
        text: faker.lorem.paragraph(3),
        userId: user._id,
        created: faker.date.recent(),
        updated: faker.date.recent(),
        commentIds: [],
        categoryId:
          categories[Math.floor(Math.random() * categories.length)]._id,
      });
      for (let j = 0; j < Math.ceil(Math.random() * 10); j++) {
        const comment = new Comment({
          userId: users[Math.floor(Math.random() * users.length)]._id,
          text: faker.lorem.sentence(Math.ceil(Math.random() * 3)),
          //[@faker-js/faker]: faker.date.between(from, to) is deprecated since v8.0 and will be removed in v9.0. Please use faker.date.between({ from, to }) instead.
          // created: faker.date.between(story.created, Date.now()),
          created: faker.date.between({ from: story.created, to: Date.now() }),
          storyId: story._id,
        });
        await comment.save();
        story.commentIds.push(comment._id);
      }
      await story.save();
      stories.push(story);
    }
  }
  console.log("Data populated successfully");
}

populateDummyData().catch(console.error);
