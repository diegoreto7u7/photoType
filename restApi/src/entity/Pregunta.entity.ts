import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Tema } from "./Tema.entity";
import { Respuesta } from "./Respuesta.entity";
import { PartidaPregunta } from "./PartidaPregunta.entity";

@Entity()
export class Pregunta {
  @PrimaryGeneratedColumn()
  id_pregunta: number;

  @Column()
  img: string;

  @Column()
  texto: string;

  @ManyToOne(() => Tema, tema => tema.preguntas)
  tema: Tema;

  @OneToMany(() => Respuesta, respuesta => respuesta.pregunta)
  respuestas: Respuesta[];

  @OneToMany(() => PartidaPregunta, partidaPregunta => partidaPregunta.pregunta)
  partidaPreguntas: PartidaPregunta[];
}

