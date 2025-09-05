import { InputType, Field, Int } from '@nestjs/graphql';
import { EstadoLaboral } from '@personal/enums/estado-laboral.enum';
import { Genero } from '@personal/enums/genero.enum';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsUUID,
  IsInt,
} from 'class-validator';

@InputType()
export class CreatePersonalDto {
  @Field()
  @IsString()
  @Length(8, 8)
  dni: string;

  @Field()
  @IsString()
  @Length(1, 45)
  nombre: string;

  @Field()
  @IsString()
  @Length(1, 45)
  apellidoPaterno: string;

  @Field()
  @IsString()
  @Length(1, 45)
  apellidoMaterno: string;

  @Field(() => Genero)
  @IsEnum(Genero)
  genero: Genero;

  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;

  @Field()
  @IsString()
  @Length(1, 45)
  direccion: string;

  @Field()
  @IsString()
  @Length(6, 11)
  telefono: string;

  @Field(() => EstadoLaboral)
  @IsEnum(EstadoLaboral)
  estadoLaboral: EstadoLaboral;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  status?: number;

  @Field(() => String)
  @IsUUID()
  usuarioId: string;
}
