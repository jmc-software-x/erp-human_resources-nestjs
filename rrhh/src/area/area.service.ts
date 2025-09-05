import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Area } from './entities/area.entity';
import { CreateAreaInput } from './dto/create-area.input';
import { UpdateAreaInput } from './dto/update-area.input';
import { EstadoArea } from './enums/area-estado.enum';

@Injectable()
export class AreaService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
  ) {}

  async create(createAreaInput: CreateAreaInput): Promise<Area> {
    const area = this.areaRepository.create({
      ...createAreaInput,
      ARE_estado: EstadoArea.A,
    });
    return this.areaRepository.save(area);
  }

  async findAll(): Promise<Area[]> {
    return this.areaRepository.find();
  }

  async findOne(id: string): Promise<Area> {
    const area = await this.areaRepository.findOne({ where: { idarea: id } });
    if (!area) throw new NotFoundException(`Área ${id} no encontrada`);
    return area;
  }

  async update(updateAreaInput: UpdateAreaInput): Promise<Area> {
    const area = await this.findOne(updateAreaInput.idarea);
    Object.assign(area, updateAreaInput);
    return this.areaRepository.save(area);
  }

  async remove(id: string): Promise<Area> {
    const area = await this.findOne(id);
    return this.areaRepository.remove(area);
  }

  async activate(id: string): Promise<Area> {
    const area = await this.findOne(id);
    area.ARE_estado = EstadoArea.A;
    return this.areaRepository.save(area);
  }

  async deactivate(id: string): Promise<Area> {
    const area = await this.findOne(id);
    area.ARE_estado = EstadoArea.I;
    return this.areaRepository.save(area);
  }
}

