import { registerEnumType } from "@nestjs/graphql";

export enum Genero {
  F = 'F', 
  M = 'M', 
  X = 'X', 
}
registerEnumType(Genero, {
  name: 'Genero', 
  description: 'Genero del personal',
});