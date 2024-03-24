const express = require("express");
const ejs = require("ejs");
const app = express();
const session = require("express-session");

app.use(
  session({
    secret: "123456", // Change this to a random string
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");
app.use(express.urlencoded());
app.use(express.json());

const route = require("./routes/router");
app.use(route);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
