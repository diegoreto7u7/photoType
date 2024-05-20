import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class Encrypt {
  private static saltRounds = 10;
  private static jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

  // Encriptar la contraseña
  static async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  // Comparar la contraseña para el proceso de inicio de sesión
  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Generar un token
  static generateToken(payload: object): string {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
  }

  // Verificar un token
  static verifyToken(token: string): object | string {
    return jwt.verify(token, this.jwtSecret);
  }
}
