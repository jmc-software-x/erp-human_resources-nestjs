import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { EstadoCargo } from 'cargo/enums/estado-cargo.enum';

@InputType()
export class CreateCargoInput {
  @Field()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @Field(() => EstadoCargo, { nullable: true })
  @IsOptional()
  estado?: EstadoCargo;

  @Field(() => String, { nullable: true })
  @IsOptional()
  areaId?: string;
}
