const express = require("express");
const ejs = require("ejs");
const app = express();
const session = require("express-session");
const shirts = require('./productController');
app.use(express.static('public'))
app.use(
  session({
    secret: "123456",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.json());

const route = require("./routes/router");
app.use(route);
////////////
app.get('/home', (req, res) => {
  if (req.session.username) {
      console.log("shirts =", shirts);
      res.render('home', { username: req.session.username, shirts: shirts });
  } else {
      res.redirect("/login");
  }
});


////////////

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
