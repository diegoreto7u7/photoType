// typeorm-config.ts
import { ConnectionOptions } from "typeorm";
import * as dotenv from "dotenv";
import { Usuario } from "./src/entity/Usuario.entity";
import { Partida } from "./src/entity/Partida.entity";
import { Pregunta } from "./src/entity/Pregunta.entity";
import { Respuesta } from "./src/entity/Respuesta.entity";
import { Tema } from "./src/entity/Tema.entity";
import { PartidaPregunta } from "./src/entity/PartidaPregunta.entity";

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_SID, NODE_ENV } = process.env;

const connectionOptions: ConnectionOptions = {
  type: "oracle",
  host: DB_HOST || "your_host", // Aquí deberías poner tu host de Oracle
  port: parseInt(DB_PORT || "1521"),
  username: DB_USERNAME || "your_username", // Aquí deberías poner tu usuario de Oracle
  password: DB_PASSWORD || "your_password", // Aquí deberías poner tu contraseña de Oracle
  sid: DB_SID || "your_sid", // Aquí deberías poner tu SID de Oracle
  synchronize: NODE_ENV === "dev", // Sincronización de la base de datos (solo para desarrollo)
  logging: NODE_ENV === "dev", // Activar logging (solo para desarrollo)
  entities: [Usuario, Partida, Pregunta, Respuesta, Tema, PartidaPregunta], // Entidades que quieres incluir en la conexión
  migrations: [], // Rutas de las migraciones (si las tienes)
  subscribers: [], // Subscriptores que quieres incluir
};

export default connectionOptions;

