import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateContratoInput } from './create-Contrato.input';
import { EstadoContrato } from 'contrato/Enums/estadoContrato.enum';

@InputType()
export class UpdateContratoInput extends PartialType(CreateContratoInput) {
  @Field(() => Date, { nullable: true })
  fechaInicio?: Date;

  @Field(() => Date, { nullable: true })
  fechaSalida?: Date;


  @Field(() => EstadoContrato, { nullable: true })
  estadoc?: EstadoContrato;
}
