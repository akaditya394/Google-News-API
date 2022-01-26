require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  var options = {
    method: "GET",
    url: "https://google-news.p.rapidapi.com/v1/search",
    params: { q: req.body.searchQuery, lang: "en" },
    headers: {
      "x-rapidapi-host": process.env.API_HOST,
      "x-rapidapi-key": process.env.API_KEY,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      const newsHeadlines = response.data;
      const newsTitle = newsHeadlines.articles[0].title;
      const newsLink = newsHeadlines.articles[0].link;
      const publishedDate = newsHeadlines.articles[0].published;
      console.log(newsTitle);
      console.log(newsLink);
      console.log(publishedDate);
      res.send("Latest news about " + req.body.searchQuery + ". " +newsTitle+ ". "+ publishedDate +". " +newsLink);
    })
    .catch(function (error) {
      console.error(error);
    });

   
});

app.listen(4000, () => {
  console.log("server listening on port");
});
