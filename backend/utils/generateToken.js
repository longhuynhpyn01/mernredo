import jwt from "jsonwebtoken";

const generateToken = (id) => {
  //payload is "userId" -> req.user._id
  return jwt.sign({ userId: id }, process.env.ACCESS_TOKEN_SECRET); //return token
};

export default generateToken;
