const express = require("express");
const mongoose = require("mongoose");
const Article = require("./modeles/Article.js");
const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://houdaifabousbai07_db_user:FMFKVPZkKQQPyRUI@cluster0.8xvd5fs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connected successfully");
  })
  .catch((error) => {
    console.log("error with connecting with the DB ", error);
  });

//mongodb+srv://houdaifabousbai07_db_user:<db_password>@cluster0.suvalek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.get("/findSummation/:number1/:number2", (req, res) => {
  const num1 = req.params.number1;
  const num2 = req.params.number2;

  const total = Number(num1) + Number(num2);

  res.send(`the total is ${total}`);
});

app.get("/sayhello", (req, res) => {
  // console.log(req.body);

  // console.log(req.query);
  // res.send(`Hello ${req.body.name}, Age is: ${req.query.age}`);

  res.json({
    name: req.body.name,
    age: req.query.age,
    language: "Arabic",
  });
});
app.get("/numbers", (req, res) => {
  let numbers = "";
  for (let i = 0; i <= 100; i++) {
    numbers += i + " - ";
  }
  // res.send(`the numbers are: ${numbers}`);

  // res.send(__dirname + "/views/numbers.html");
  // res.sendFile(__dirname + "/views/numbers.html");
  res.render("numbers.ejs", {
    name: "Ahmad",
    numbers: numbers,
  });
});

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.delete("/hi", (req, res) => {
  res.send("hi ah hhhhh");
});

app.put("/test", (req, res) => {
  res.send("hello hi ah hhh");
});

app.post("/addc", (req, res) => {
  res.send("add comment");
});

app.delete("/testingDelete", (req, res) => {
  res.send("delete request");
});

// ======= ARTICLES ENDPOINTS =====

app.post("/articles", async (req, res) => {
  const newArticle = new Article();

  const title = req.body.title;
  const body = req.body.body;

  newArticle.title = title;
  newArticle.body = body;
  newArticle.numberOfLikes = 100;
  await newArticle.save();

  res.json(newArticle);
});

app.get("/articles", async (req, res) => {
  // const id = req.params.articleId;
  try {
    const articles = await Article.find();
    res.send(articles);
  } catch (error) {
    console.log("error while reading article of id");
    return res.send("error");
  }

  // res.json(articles);
});

app.delete("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const articles = await Article.findByIdAndDelete(id);

    if (!articles) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json({
      message: "Article deleted successfully",
      deletedArticle: article, // ❌ here you used "article", but above it's "articles"
    });
  } catch (error) {
    console.error("Error while deleting article:", error);
    res.status(500).json({ error: "Failed to delete article" });
  }
});

  app.get("/showArticles", async (req, res) => {
  try {
    const articles = await Article.find(); // جلب المقالات من قاعدة البيانات
    res.render("articles.ejs", { allArticles: articles }); 
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching articles");
  }
});



app.listen(3000, () => {
  console.log("I am listening in port 3000");
});
