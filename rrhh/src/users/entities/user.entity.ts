import { ObjectType, Field } from '@nestjs/graphql';
import { Personal } from '@personal/entities/personal.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(()=> String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

 @OneToMany(() => Personal, (personal) => personal.usuario)
  personales: Personal[];


}
