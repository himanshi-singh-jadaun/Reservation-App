import express from "express";
import { createError } from "../utils/error.js";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken , verifyUser} from "../utils/verifyToken.js";

const router = express.Router();

// next there we start running verifyToken
router.get("/checkauthentication", verifyToken,(req,res,next) => {
    res.send("hello user, you are logged in");
});

router.get("/checkuser/:id",verifyUser,(req,res,next) => {
    res.send("hello user, you are logged in and you can delete ur account");
});

router.get("/checkadmin/:id",verifyAdmin,(req,res,next) => {
    res.send("hello admin, you are logged in and you can delete all accounts");
});


//UPDATE
// we can pass parameter via link like this(here parameter is id)
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getAllUser);

export default router;