import { ObjectType, Field, GraphQLISODateTime, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EstadoArea } from 'area/enums/area-estado.enum';
import { Contrato } from 'contrato/entities/contrato.entity';
import { Cargo } from '../../cargo/entities/cargo.entity';

@Entity('area')
@ObjectType()
export class Area {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  idarea: string;

  @Column({ length: 45 })
  @Field()
  ARE_nombre: string;

  @Column({
    type: 'enum',
    enum: EstadoArea,
    default: EstadoArea.A,
  })
  @Field(() => EstadoArea)
  ARE_estado: EstadoArea;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @OneToMany(() => Contrato, contrato => contrato.area)
  @Field(() => [Contrato], { nullable: true })
  contratos?: Contrato[];

  @OneToMany(() => Cargo, cargo => cargo.area) 
  @Field(() => [Cargo], { nullable: true })
  cargos?: Cargo[];
}
