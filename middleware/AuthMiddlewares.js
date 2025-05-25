import jwt from "jsonwebtoken";
import { env } from "../utils/helpers.js";

function requiredAuth(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, env("JWT_SECRET"), (tokenError, decodedToken) => {
      if (tokenError) {
        res.status(400).json({ error: "jwt error" });
        // res.redirect("/login");
      } else {
        res.userId = decodedToken.id;
        next();
      }
    });
  } else {
    res.status(400).json({ error: "jwt error" });

    // res.redirect("/login");
  }
}

export { requiredAuth };
