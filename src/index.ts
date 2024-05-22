import "reflect-metadata";
import * as express from "express";
import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./data-source"; // Importar la fuente de datos
import preguntaRoutes from "./routes/pregunta.routes";
import respuestaRoutes from "./routes/respuesta.routes";
import userRoutes from "./routes/user.routes"; // Importar rutas de usuario
import * as oracledb from "oracledb";
import { errorHandler } from "./middlewares/error.middleware"; // Importar el middleware de manejo de errores
import { console } from "console";
dotenv.config();

const app = express();
app.use(express.json());

const { PORT = 3000, ORACLE_DB_USER, ORACLE_DB_PASSWORD, ORACLE_DB_HOST, ORACLE_DB_PORT, ORACLE_DB_SID } = process.env;

// Middleware para manejar errores
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Rutas
app.use("/api/preguntas", preguntaRoutes);
app.use("/api/respuestas", respuestaRoutes);
app.use("/api/users", userRoutes); // Usar rutas de usuario

// Ruta de ejemplo para la raíz
app.get("/", async (req: Request, res: Response) => {
  let connection;

  try {
    // Configurar la conexión con Oracle DB
    const connectionParams: oracledb.ConnectionAttributes = {
      user: ORACLE_DB_USER,
      password: ORACLE_DB_PASSWORD,
      connectString: `${ORACLE_DB_HOST}:${ORACLE_DB_PORT}/${ORACLE_DB_SID}`
    };

    // Obtener una conexión de la pool
    connection = await oracledb.getConnection(connectionParams);

    // Ejemplo de consulta
    const result = await connection.execute("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al conectar con Oracle DB:", error);
    res.status(500).json({ message: "Error al conectar con Oracle DB" });
  } finally {
    // Liberar la conexión al finalizar
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error("Error al cerrar la conexión con Oracle DB:", error);
      }
    }
  }
});
// Middleware global de manejo de errores
app.use(errorHandler);


// Inicializar la conexión a la base de datos y arrancar el servidor
AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log("Error during Data Source initialization:", error));

