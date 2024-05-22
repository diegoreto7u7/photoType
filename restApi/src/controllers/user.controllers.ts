import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Usuario } from "../entity/Usuario";
import { Encrypt } from '../helpers/helpers';

class UserController {
  // Registrar un nuevo usuario
  async register(req: Request, res: Response) {
    const { username, password } = req.body;
    const userRepository = getRepository(Usuario);

    try {
      const hashedPassword = await Encrypt.encryptPassword(password);
      const newUser = userRepository.create({ username, contraseña: hashedPassword });
      await userRepository.save(newUser);

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
  }
  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const userRepository = getRepository(Usuario);

    try {
      const user = await userRepository.findOne({ where: { username } });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isValidPassword = await Encrypt.comparePassword(password, user.contraseña);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = Encrypt.generateToken({ id: user.id_usuario, username: user.username });

      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  }
}
export default new UserController();
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
