import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '@users/entities/user.entity';

@ObjectType()
@Entity()
export class Personal {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 8 })
  dni: string; 
  @Field()
  @Column({ length: 45 })
  nombre: string;

  @Field()
  @Column({ length: 45 })
  apellidoPaterno: string;

  @Field()
  @Column({ length: 45 })
  apellidoMaterno: string;

  @Field()
  @Column({ length: 45 })
  genero: string;

 @Field(() => String, { nullable: true })  
  @Column({ type: 'date', nullable: true })
  fechaNacimiento?: Date;


  @Field()
  @Column({ length: 45 })
  direccion: string;

  @Field()
  @Column({ length: 11 })
  telefono: string;

  @Field()
  @Column({ length: 1 })
  estadoLaboral: string;

  @Field()
  @Column()
 usuarioId: string;

  @Field(() => User, { nullable: true }) 
  @ManyToOne(() => User, (user) => user.personales , { eager: true })
  @JoinColumn({ name: 'usuarioId' })
  usuario?: User;
}
