const shirts = require('../productController');
const USER = [
  {
    username: "amith",
    password: "password",
  },
];

exports.post_login = async (req, res) => {
  const { username, password } = req.body;

  console.log("username =", username);
  console.log("password =", password);
  try {
    const user = await USER.find((element) => {
      return element.username == username && element.password == password;
    });
    console.log("user = ", user);
    if (user) {
      req.session.user = user;
      res.json({ username });
    } else {
      res.status(401).json({ userList:USER,error: "No user exist" });
    }
  } catch (error) {
    console.log("user is not defined ", error);
  }
};

exports.post_logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ error: "Logout failed" });
    } else {
      // Redirect to the login page after logout
      res.redirect("/");
    }
  });
};

exports.get_home = async (req, res) => {
  if (req.session.user) {
    res.render('home', { username: req.session.username, shirts: shirts });
  } else {
    res.redirect("/");
  }
};
