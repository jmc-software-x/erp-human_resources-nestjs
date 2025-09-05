import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { EstadoLaboral } from "../enums/estado-laboral.enum";
import { Genero } from '../enums/genero.enum';
import { IsInt, IsUUID } from 'class-validator';
import { UUID } from 'typeorm/driver/mongodb/bson.typings.js';
import { Contrato } from 'contrato/entities/contrato.entity';

@ObjectType()
@Entity()
export class Personal {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;


  @Field(() => String)
  @Column({ type: 'uuid' })
  usuarioId: string;


  @Field()
  @Column({ type: 'varchar', length: 8,unique:true })
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
  @Column({ type: 'varchar', length: 11 ,unique:true})
  telefono: string;

  @Field(() => String)
  @Column({
    type: 'enum',
    enum: EstadoLaboral,
    default: EstadoLaboral.A,
  })
  estadoLaboral: EstadoLaboral;


 @Field(() => Int)
  @Column({ type: 'int', default: 1 }) 
  status: number;


  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.personales,
   { eager: true ,
    nullable:false})
  @JoinColumn({ name: 'usuarioId' })
  usuario?: User;

  @OneToMany(() => Contrato, (contrato) => contrato.personal)
  @Field(() => [Contrato], { nullable: true })
  contrato?: Contrato[];
 
//Primer Getter enTRE Todas Los Entitites DNI = NOMBRE COMPLETO
    @Field(() => String)
  get nombreCompleto(): string {
    return `${this.nombre} ${this.apellidoPaterno} ${this.apellidoMaterno}`;
  }
}
