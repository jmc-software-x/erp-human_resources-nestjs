import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { EstadoLaboral } from "../enums/estado-laboral.enum";
import { Genero } from '../enums/genero.enum';
import { IsInt } from 'class-validator';

@ObjectType()
@Entity()
export class Personal {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 8 })
  dni: string;

  @Field()
  @Column({ type: 'varchar', length: 45 })
  nombre: string;

  @Field()
  @Column({ type: 'varchar', length: 45 })
  apellidoPaterno: string;

  @Field()
  @Column({ type: 'varchar', length: 45 })
  apellidoMaterno: string;

  @Field(() => String)
  @Column({
    type: 'enum',
    enum: Genero,
  })
  genero: Genero;

  @Field(() => String, { nullable: true })
  @Column({ type: 'date', nullable: true })
  fechaNacimiento?: Date;

  @Field()
  @Column({ type: 'varchar', length: 45 })
  direccion: string;

  @Field()
  @Column({ type: 'varchar', length: 11 })
  telefono: string;

  @Field(() => String)
  @Column({
    type: 'enum',
    enum: EstadoLaboral,
    default: EstadoLaboral.A,
  })
  estadoLaboral: EstadoLaboral;

  @Field(() => String)
  @Column({ type: 'uuid' })
  usuarioId: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.personales, { eager: true })
  @JoinColumn({ name: 'usuarioId' })
  usuario?: User;

  @Field(() => Int)
  @Column({ type: 'int', default: 1 }) 
  status: number;
}
