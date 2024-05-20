import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Usuario } from "./entity/Usuario";
import { Partida } from "./entity/Partida";
import { Pregunta } from "./entity/Pregunta";
import { Respuesta } from "./entity/Respuesta";
import { Tema } from "./entity/Tema";
import { PartidaPregunta } from "./entity/PartidaPregunta";

dotenv.config();

const { ORACLE_DB_USER, ORACLE_DB_PASSWORD, ORACLE_DB_HOST, ORACLE_DB_PORT, ORACLE_DB_SID, NODE_ENV } = process.env;

export const AppDataSource = new DataSource({
  type: "oracle",
  host: ORACLE_DB_HOST,
  port: parseInt(ORACLE_DB_PORT || "1521"),
  username: ORACLE_DB_USER,
  password: ORACLE_DB_PASSWORD,
  sid: ORACLE_DB_SID,
  synchronize: NODE_ENV === "dev",
  logging: NODE_ENV === "dev",
  entities: [Usuario, Partida, Pregunta, Respuesta, Tema, PartidaPregunta],
  migrations: [],
  subscribers: [],
});

