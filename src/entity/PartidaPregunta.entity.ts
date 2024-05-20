import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Partida } from "./Partida.entity";
import { Pregunta } from "./Pregunta.entity";

@Entity()
export class PartidaPregunta {
  @PrimaryGeneratedColumn()
  id_partida_pregunta: number;

  @ManyToOne(() => Partida, partida => partida.partidaPreguntas)
  partida: Partida;

  @ManyToOne(() => Pregunta, pregunta => pregunta.partidaPreguntas)
  pregunta: Pregunta;
}
