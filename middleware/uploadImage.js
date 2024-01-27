import path from "path";
import multer from "multer";

// This will configure multer to store incoming files in a directory named "uploads" in your server.
// Each file will be given a unique filename.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  },
});

const upload = multer({ storage });

export default upload;
