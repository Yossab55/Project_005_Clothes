function getSignupView(req, res) {
  res.render("signup.ejs");
}

async function createUser(req, res) {
  const { username, email, password } = req.body;
  // todo createCustom middleware for error handling;
}
