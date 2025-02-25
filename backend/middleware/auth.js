import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Erişim reddedildi." });

  try {
    const verified = jwt.verify(token, "SECRET_KEY");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Geçersiz token." });
  }
};

export default auth;
