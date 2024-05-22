import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Respuesta } from "../entity/Respuesta.entity";

export const getRespuestas = async (req: Request, res: Response): Promise<Response> => {
  const respuestas = await getRepository(Respuesta).find();
  return res.json(respuestas);
};

export const getRespuesta = async (req: Request, res: Response): Promise<Response> => {
  const result = await getRepository(Respuesta).findOne(req.params.id);
  return res.json(result);
};

export const createRespuesta = async (req: Request, res: Response): Promise<Response> => {
  const newRespuesta = getRepository(Respuesta).create(req.body);
  const result = await getRepository(Respuesta).save(newRespuesta);
  return res.json(result);
};

export const updateRespuesta = async (req: Request, res: Response): Promise<Response> => {
  const respuesta = await getRepository(Respuesta).findOne(req.params.id);
  if (respuesta) {
    getRepository(Respuesta).merge(respuesta, req.body);
    const result = await getRepository(Respuesta).save(respuesta);
    return res.json(result);
  }
  return res.status(404).json({ msg: "Respuesta no encontrada" });
};

export const deleteRespuesta = async (req: Request, res: Response): Promise<Response> => {
  const result = await getRepository(Respuesta).delete(req.params.id);
  return res.json(result);
};
