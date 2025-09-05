import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';
import { EstadoCargo } from '../enums/estado-cargo.enum';

@InputType()
export class UpdateCargoInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(100)
  nombre?: string;

  @Field(() => EstadoCargo, { nullable: true })
  @IsOptional()
  estado?: EstadoCargo;

  @Field(() => String, { nullable: true })
  @IsOptional()
  areaId?: string;
}
