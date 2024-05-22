import { Request, Response, NextFunction } from "express";
import { console } from "node:console"; // Add missing import
import process from "node:process"; // Add missing import

// Middleware global para manejar errores
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack); // Loguear el error en la consola

  // Responder con un error 500 por defecto
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
}
