import jwt from "jsonwebtoken";
import { env } from "../utils/helpers.js";

function requiredAuth(req, res, next) {
  const token = req.cookies.jwt;
  const errors = {
    jwt: "jwt wrong or not provide with the request",
  };
  if (token) {
    jwt.verify(token, env("JWT_SECRET"), (tokenError, decodedToken) => {
      if (tokenError) {
        res.status(400).json({ errors });
        //todo  res.redirect("/login");
      } else {
        req.userId = decodedToken.id;
        next();
      }
    });
  } else {
    res.status(400).json({ errors });

    // res.redirect("/login");
  }
}

export { requiredAuth };
