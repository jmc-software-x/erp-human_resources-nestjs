import { registerEnumType } from "@nestjs/graphql";



export enum EstadoContrato{
    I = 0,
    A = 1,
    P = 2

}
registerEnumType(EstadoContrato,{
  name: 'EstadoContrato',
  description: 'Estado Contrato de la persona (A = Activo, I = Inactivo, P =    Pendiente)',
});
