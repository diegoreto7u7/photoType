import { Router } from "express";
import { getUsers, createUser } from "../controllers/user.controllers";

const router = Router();
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get("/", getUsers);
router.post("/", createUser);

export { router as userRouter };
export default router;