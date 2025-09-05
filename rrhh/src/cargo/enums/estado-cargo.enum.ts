export enum EstadoCargo {
  INACTIVO = 'I',
  ACTIVO = 'A',
  SUSPENDIDO = 'S',
}

import { registerEnumType } from '@nestjs/graphql';

registerEnumType(EstadoCargo, {
  name: 'EstadoCargo',
  description: 'Estado del Cargo (A = Activo, I = Inactivo, S = Suspendido)',
});
