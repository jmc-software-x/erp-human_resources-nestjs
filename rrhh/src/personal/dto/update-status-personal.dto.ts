// application/personal/Dto/update-status-personal.dto.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsUUID, IsInt, Min, Max } from 'class-validator';

@InputType()
export class StatusPersonalDto {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @IsInt()
  @Min(0)
  @Max(1)
  status: number; 
}
