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

  async findOne(id: number): Promise<Personal> {
    const personal = await this.personalRepo.findOne({ where: { id }, relations: ['usuario'] });
    if (!personal) {
      throw new NotFoundException(`Personal con id ${id} no encontrado`);
    }
    return personal;
  }

  async create(data: CreatePersonalDto, userId: string): Promise<Personal> {
    const personal = this.personalRepo.create({
      ...data,
      usuarioId: userId,
    });
    const saved = await this.personalRepo.save(personal);
    return this.findOne(saved.id);
  }

  async update(dto: UpdatePersonalDto): Promise<Personal> {
    await this.personalRepo.update(dto.id, dto);
    return this.findOne(dto.id);
  }

async remove(id: number): Promise<Personal> {
  const personal = await this.findOne(id);
  await this.personalRepo.remove(personal);
  return personal;
}

}
