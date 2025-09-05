import { Module } from '@nestjs/common';
import { ContratoService } from './contrato.service';
import { ContratoResolver } from './contrato.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contrato } from './entities/contrato.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contrato])],
  providers: [ContratoResolver, ContratoService],
  exports: [TypeOrmModule],
})
export class ContratoModule {}
