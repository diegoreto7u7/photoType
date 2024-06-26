import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Pregunta } from "./Pregunta.entity";

@Entity()
export class Tema {
  @PrimaryGeneratedColumn()
  id_tema: number;

  @Column()
  nombre: string;

  @OneToMany(() => Pregunta, pregunta => pregunta.tema)
  preguntas: Pregunta[];
}
