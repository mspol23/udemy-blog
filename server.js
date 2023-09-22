import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

// Routes to render the main page
app.get("/", (req, res) => {res.redirect("/get-posts")});

app.get("/get-posts", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/get-posts`);
    console.log(response);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

app.get("/get-posts/:id", async (req, res) => {
  try {
    const idNum = req.params.id;
    const response = await axios.get(`${API_URL}/get-posts/${idNum}`);
    console.log(response)
    res.render("index.ejs", { posts: response.data })
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts" })
  }
})

// Route to create new-post.
app.get("/new-post", (req, res) => {
  res.render("modify.ejs", { heading: "New Post", submit:
  "Create Post" });
});

app.post("/new-post", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/new-post`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
});

// Route to edit new-post.
app.get("/edit-post/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/edit-post/${req.params.id}`);
    console.log(response.data);
    res.render("modify.ejs", {
      heading: "Edit Post",
      submit: "Update Post",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching post" });
  }
});

app.post("/edit-post/:id", async (req, res) => {
  try {
    const response = await axios.patch(`${API_URL}/edit-post/${req.params.id}`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

// Delete a post
app.get("/delete-post/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/delete-post/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});


// Create a new post
// Partially update a post