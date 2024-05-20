import { Request, Response, NextFunction } from "express";

// Middleware global para manejar errores
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack); // Loguear el error en la consola

  // Responder con un error 500 por defecto
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
}
