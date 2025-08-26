import { registerEnumType } from '@nestjs/graphql';

export enum EstadoLaboral {
  A = 'A',
  I = 'I',
  X = 'X',
}

registerEnumType(EstadoLaboral, {
  name: 'EstadoLaboral',
  description: 'Estado laboral de la persona (A = Activo, I = Inactivo)',
});
