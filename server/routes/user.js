import express from "express";
// import { signup, signin,googleSignIn  } from "../controllers/user.js"
import { signup, signin  } from "../controllers/user.js"

const router = express.Router();


router.post("/signup", signup)
router.post("/signin", signin)
// router.post("/googleSignIn", googleSignIn)


export default router;