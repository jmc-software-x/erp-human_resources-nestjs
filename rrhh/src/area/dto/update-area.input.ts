import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateAreaInput } from './create-area.input';
import { EstadoArea } from 'area/enums/area-estado.enum';

@InputType()
export class UpdateAreaInput extends PartialType(CreateAreaInput) {
  @Field(() => Int)
  idarea: string;

  @Field(() => EstadoArea, { nullable: true })
  ARE_estado?: EstadoArea;
}
