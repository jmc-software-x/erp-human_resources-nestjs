import { InputType, Field } from '@nestjs/graphql';
import { EstadoLaboral } from '@personal/enums/estado-laboral.enum';
import { Genero } from '@personal/enums/genero.enum';
import { IsDateString, IsIn, IsNotEmpty, IsString, Length, IsUUID } from 'class-validator';

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
  genero: Genero;
  
 @Field(() => String)
  fechaNacimiento: string;

  @Field()
  @IsString()
  @Length(1, 45)
  direccion: string;

  @Field()
  @IsString()
  @Length(6, 11)
  telefono: string;

  @Field(() => EstadoLaboral)
  estadoLaboral: EstadoLaboral;

}
