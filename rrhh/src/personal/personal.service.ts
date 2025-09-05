import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Personal } from './entities/personal.entity';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { CreatePersonalDto } from './dto/create-personal.dto';

@Injectable()
export class PersonalService {
  constructor(
    @InjectRepository(Personal)
    private readonly personalRepo: Repository<Personal>,
  ) {}

  async findAll(): Promise<Personal[]> {
    return this.personalRepo.find({ relations: ['usuario'] });
  }

  async findOne(id: string): Promise<Personal> {
    const personal = await this.personalRepo.findOne({ where: { id }, relations: ['usuario'] });
    if (!personal) {
      throw new NotFoundException(`Personal con id ${id} no encontrado`);
    }
    return personal;
  }


async findByDni(dni: string): Promise<Personal | null> {
  return this.personalRepo.findOne({
    where: { dni },
    relations: ['contrato'],
  });
}

  async create(data: CreatePersonalDto, userId: string): Promise<Personal> {
    const personal = this.personalRepo.create({
      ...data,
      usuarioId: userId, 
    });

    const saved = await this.personalRepo.save(personal);
    return this.findOne(saved.id);
  }

  async update(id: string, dto: UpdatePersonalDto): Promise<Personal> {
    const personal = await this.personalRepo.preload({
      id,
      ...dto,
    });

    if (!personal) {
      throw new NotFoundException(`Personal con id ${id} no encontrado`);
    }

    return this.personalRepo.save(personal);
  }

  async remove(id: string): Promise<Personal> {
    const personal = await this.findOne(id);
    await this.personalRepo.remove(personal);
    return personal;
  }

  async disable(id: string): Promise<Personal> {
    const personal = await this.findOne(id);
    personal.status = 0;
    return this.personalRepo.save(personal);
  }
}




