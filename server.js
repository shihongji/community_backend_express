import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postsRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";
import commentRoutes from "./routes/comment.js";
import categoryRoutes from "./routes/category.js";
import verifyEmail from "./routes/verification.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import cookieParser from "cookie-parser";

const allowedOrigins = ["http://localhost:3000", "http://localhost:4000"];

const app = express();
dotenv.config();
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  }),
);
app.use(cookieParser());

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
// Configuring the Cloudinary SDK
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuring Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Hackers Club API",
      version: "0.5.0",
      description: "Hackers Club API Information (Express)",
      contact: {
        name: "Hongji",
      },
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

// Use post routes
app.use("/posts", postsRoutes);
// user routes
app.use("/users", userRoutes);
// comment routes
app.use("/comments", commentRoutes);
// category routes
app.use("/categories", categoryRoutes);
// verification routes
app.use("/verify", verifyEmail);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
