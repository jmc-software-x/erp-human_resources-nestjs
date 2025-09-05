import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Personal } from '@personal/entities/personal.entity';
import { Area } from 'area/entities/area.entity';
import { IsBoolean } from 'class-validator';
import { EstadoContrato } from 'contrato/Enums/estadoContrato.enum';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()

export class Contrato {

@PrimaryGeneratedColumn('uuid')
@Field()  
id: string;

@Field(() => Date)
@Column({ type: 'date' })
fechaInicio: Date;

@Column()
@Field(() => Date)
fechaSalida: Date;

  @Field(() => EstadoContrato)
  @Column({
    type: 'enum',
    enum: EstadoContrato,
    default: EstadoContrato.A,
  })
  estado: EstadoContrato;


 @Column({ type: 'uuid' })
  @Field(() => String)
  personalId: string;


  @ManyToOne(() => Personal, (personal) => personal.contrato, { eager: true })
  @JoinColumn({ name: 'personalId' })
  @Field(() => Personal)
  personal: Personal;

  @ManyToOne(() => Area, area => area.contratos)
  @Field(() => Area)
  area: Area;
  
}


