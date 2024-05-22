import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Pregunta } from "./Pregunta.entity";

@Entity()
export class Respuesta {
  @PrimaryGeneratedColumn()
  id_respuesta: number;

  @Column({ default: 0 })
  correcta: number; // 1 o 0, por defecto 0

  @Column()
  texto: string;

  @ManyToOne(() => Pregunta, pregunta => pregunta.respuestas)
  pregunta: Pregunta;
}
