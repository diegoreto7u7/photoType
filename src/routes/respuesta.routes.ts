import { Router } from "express";
import { getRespuestas, getRespuesta, createRespuesta, updateRespuesta, deleteRespuesta } from "../controllers/respuesta.controller";

const router = Router();

router.get("/", getRespuestas);
router.get("/:id", getRespuesta);
router.post("/", createRespuesta);
router.put("/:id", updateRespuesta);
router.delete("/:id", deleteRespuesta);

export default router;
