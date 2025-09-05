import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString, MinDate } from 'class-validator';
import { EstadoContrato } from 'contrato/Enums/estadoContrato.enum';
import { Type } from 'class-transformer';

@InputType()
export class CreateContratoInput {
  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  @MinDate(new Date())
  fechaInicio: Date;

  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  @MinDate(new Date())
  fechaSalida: Date;

  @Field(() => EstadoContrato, { nullable: true })
  @IsOptional()
  estado?: EstadoContrato;

  @Field(() => String)
  @IsString()
  personalId: string;
}


