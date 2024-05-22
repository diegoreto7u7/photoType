import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/encrypt";
import { UserResponce} from "../dto/user.dto"; // Import UserDto from the correct path
import * as cache from "memory-cache";

export class UserController {
  static async signup(req: Request, res: Response) {
    const { name, password, admin } = req.body;
    const encryptedPassword = await encrypt.encryptpass(password);
    const user = new User();
    user.name = name;
    user.password = encryptedPassword;
    user.admin = admin;

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);
// Use the UserResponse DTO to structure the data being sent in the response
const userdataSent = new UserResponce()
userDataSent.username = user.name;
userDataSent.email= user.email;
userDataSent.admin = user.role;


    
    const token = encrypt.generateToken({ id: user.id });

    return res
      .status(200)
      .json({ message: "User created successfully", token, userDataSent });
  }
}