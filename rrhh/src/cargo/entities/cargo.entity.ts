import { ObjectType, Field, Int, GraphQLISODateTime, ID } from '@nestjs/graphql';
import { Area } from '../../area/entities/area.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EstadoCargo } from '../enums/estado-cargo.enum';

@ObjectType()
@Entity()
export class Cargo {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  nombre: string;

  @Column({ type: 'enum', enum: EstadoCargo, default: EstadoCargo.ACTIVO })
  @Field(() => EstadoCargo)
  estado: EstadoCargo;

  @ManyToOne(() => Area, area => area.cargos)
  @Field(() => Area, { nullable: true })
  area?: Area;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
