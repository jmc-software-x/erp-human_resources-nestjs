import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cargo } from './entities/cargo.entity';
import { EstadoCargo } from './enums/estado-cargo.enum';

@Injectable()
export class CargoService {
  constructor(
    @InjectRepository(Cargo)
    private readonly cargoRepository: Repository<Cargo>,
  ) {}

  async create(data: Partial<Cargo>): Promise<Cargo> {
    const cargo = this.cargoRepository.create(data);
    return this.cargoRepository.save(cargo);
  }

  async findAll(): Promise<Cargo[]> {
    return this.cargoRepository.find({ relations: ['area'] });
  }

  async findOne(id: number): Promise<Cargo> {
    const cargo = await this.cargoRepository.findOne({
      where: { id },
      relations: ['area'],
    });
    if (!cargo) throw new NotFoundException('Cargo no encontrado');
    return cargo;
  }

  async update(id: number, data: Partial<Cargo>): Promise<Cargo> {
    const cargo = await this.findOne(id);
    Object.assign(cargo, data);
    return this.cargoRepository.save(cargo);
  }

  async remove(id: number): Promise<Cargo> {
    const cargo = await this.findOne(id);
    cargo.estado = EstadoCargo.INACTIVO;
    return this.cargoRepository.save(cargo);
  }

  async disable(id: number): Promise<Cargo> {
    const cargo = await this.findOne(id);
    cargo.estado = EstadoCargo.INACTIVO;
    return this.cargoRepository.save(cargo);
  }
}
