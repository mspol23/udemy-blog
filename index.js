import express from "express";

const app = express();
const port = 4000;

// In-memory data store
const posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/get-posts", (req, res) => {
  res.json(posts)
});

//CHALLENGE 2: GET a specific post by id
app.get("/get-posts/:id", (req, res) => {
    const idNum = Number(req.params.id);
    const postById = posts.filter( post => post.id === idNum);
    console.log(postById)
    if (postById.length === 0) res.status(404);
    res.json(postById);
});

//CHALLENGE 3: POST a new post
app.post("/new-post", (req, res) => {
  // console.log(req.body);
  const newObj = {
    id: lastId + 1,
    date: new Date().toLocaleString("pt-BR"),
    ...req.body
  }
  console.log(newObj);
  posts.unshift(newObj);
  res.json(posts);
})

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.get("/edit-post/:id", (req, res) => {
  const idNum = Number(req.params.id)
  const selectPost = posts.find( post => post.id === idNum)
  console.log(selectPost)
  res.json(selectPost)
});

app.patch("/edit-post/:id", (req, res) => {
  const idNum = Number(req.params.id)
  const selectIndex = posts.findIndex(post => post.id === idNum);
  posts[selectIndex] = {id: idNum, ...req.body};
  // console.log(req.body)
  res.sendStatus(200)
})

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/delete-post/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = posts.findIndex(post => post.id === id);
  posts.splice(index, 1);
  res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});

// General functions:

function randNum(max) {
  return Math.floor(Math.random() * max)
}
