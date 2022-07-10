import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.userId = decoded.userId;
      next();
    } else
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};
