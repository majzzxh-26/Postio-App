const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection URI from Render Environment Variable
const mongoURI = "mongodb+srv://admin:<db_password>@cluster01.yhumhtu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ Connection Error:", err));

// Mongoose Schema
const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Post = mongoose.model("Post", PostSchema);

// Routes
app.get("/", (req, res) => {
  res.send("🚀 API is working");
});

app.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.status(201).json(post);
});

// Listen on Render’s dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
