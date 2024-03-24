const USER = [
  {
    username: "syamlal",
    password: "password2",
  },
  {
    username: "amith",
    password: "password",
  },
  {
    username: "manilal",
    password: "password3",
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
      res.status(401).json({ error: "No user exist" });
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
    res.render("home");
  } else {
    res.redirect("/");
  }
};
