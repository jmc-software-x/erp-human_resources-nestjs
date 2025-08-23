import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreatePersonalDto } from './create-personal.dto';

@InputType()
export class UpdatePersonalDto extends PartialType(CreatePersonalDto) {
  @Field(() => Int)
  id: number;
  usuarioId?: string | undefined;
}
