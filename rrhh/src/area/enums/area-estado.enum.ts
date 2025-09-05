import { registerEnumType } from '@nestjs/graphql';

export enum EstadoArea {
  I = 0,
  A = 1,
}

registerEnumType(EstadoArea, {
  name: 'EstadoArea',
  description: 'Estado del área (A = Activo, I = Inactivo)',
});
