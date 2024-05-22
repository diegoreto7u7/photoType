import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Pregunta } from "../entity/Pregunta.entity";

export const getPreguntas = async (req: Request, res: Response): Promise<Response> => {
  const preguntas = await getRepository(Pregunta).find();
  return res.json(preguntas);
};

export const getPregunta = async (req: Request, res: Response): Promise<Response> => {
  const result = await getRepository(Pregunta).findOne(req.params.id);
  return res.json(result);
};

export const createPregunta = async (req: Request, res: Response): Promise<Response> => {
  const newPregunta = getRepository(Pregunta).create(req.body);
  const result = await getRepository(Pregunta).save(newPregunta);
  return res.json(result);
};

export const updatePregunta = async (req: Request, res: Response): Promise<Response> => {
  const pregunta = await getRepository(Pregunta).findOne(req.params.id);
  if (pregunta) {
    getRepository(Pregunta).merge(pregunta, req.body);
    const result = await getRepository(Pregunta).save(pregunta);
    return res.json(result);
  }
  return res.status(404).json({ msg: "Pregunta no encontrada" });
};

export const deletePregunta = async (req: Request, res: Response): Promise<Response> => {
  const result = await getRepository(Pregunta).delete(req.params.id);
  return res.json(result);
};
