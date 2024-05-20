import { Router } from "express";
import { getUsers, createUser } from "../controllers/user.controllers";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);

export { router as userRouter };
