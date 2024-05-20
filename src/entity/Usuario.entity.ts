import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Partida } from "./Partida.entity";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  username: string;

  @Column()
  role: string;

  @Column()
  contraseña: string;

  @OneToMany(() => Partida, partida => partida.usuario)
  partidas: Partida[];
}
