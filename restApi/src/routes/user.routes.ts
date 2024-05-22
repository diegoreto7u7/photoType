import { Router } from "express";
import { getUsers, createUser } from "../controllers/user.controllers";

const router = Router();
router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.get("/", getUsers);
router.post("/", createUser);

export { router as userRouter };
export default router;