import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContratoInput } from './dto/inputs/create-Contrato.input';
import { UpdateContratoInput } from './dto/inputs/update-Contrato.input';
import { Contrato } from './entities/contrato.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectionPoolMonitoringEvent, Repository } from 'typeorm';
import { Personal } from '@personal/entities/personal.entity';
import { EstadoContrato } from './Enums/estadoContrato.enum';

@Injectable()
export class ContratoService {
    
 
   constructor (
      @InjectRepository(Contrato)
    private readonly contratoRepo: Repository<Contrato>
    ) {}



  createContrato(createContratoInput: CreateContratoInput) {
 
  }

  async findContratos(): Promise<Contrato[]> {
    return this.contratoRepo.find({ relations: ['personal']});
  


  }

  async findContrato(id: string): Promise<Contrato> {
    const contrato = await this.contratoRepo.findOne({
      where: { id },
      relations: ['personal'],
    });
    if (!contrato) {
      throw new NotFoundException(`Personal con id ${id} no encontrado`);
    }
    return contrato;
  }

  async update(id: string, updateContratoInput: UpdateContratoInput): Promise<Contrato> {
    const contrato = await this.contratoRepo.preload({
      id: id,
      ...updateContratoInput
    });

    if (!contrato) {
      throw new NotFoundException(`Contrato con id ${id} no encontrado`);
    }

    return this.contratoRepo.save(contrato);
  }

  
 async disable(id: string): Promise<Contrato> {
    const contrato = await this.findContrato(id);

    contrato.estado  =    EstadoContrato.I;

    return this.contratoRepo.save(contrato);

  }
}

