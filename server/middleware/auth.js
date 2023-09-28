import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const secret = "test";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const tokenArray = authHeader.split(" ");
    if (tokenArray.length !== 2 || tokenArray[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const token = tokenArray[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    }
    // else {
    //   decodedData = jwt.decode(token);
    //   const googleId = decodedData?.sub.toString();
    //   const user = await UserModel.findOne({ googleId });
    //   req.userId = user?._id;
    // }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default auth;