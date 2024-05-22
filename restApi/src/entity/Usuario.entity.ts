import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Partida } from "./Partida.entity";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  username: string;

  @Column()
  admin: number;

  @Column()
  contrasena: string;

  @OneToMany(() => Partida, partida => partida.usuario)
  partidas: Partida[];
}
