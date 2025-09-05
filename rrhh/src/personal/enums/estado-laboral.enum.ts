import { registerEnumType } from '@nestjs/graphql';

export enum EstadoLaboral {
  I = 0,
  A = 1,
  X = 2,
}

registerEnumType(EstadoLaboral, {
  name: 'EstadoLaboral',
  description: 'Estado laboral de la persona (A = Activo, I = Inactivo)',
});
