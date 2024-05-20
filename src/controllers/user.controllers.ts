import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Usuario } from "../entity/Usuario";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(Usuario);
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userRepository = getRepository(Usuario);
    const newUser = userRepository.create(req.body);
    await userRepository.save(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};
