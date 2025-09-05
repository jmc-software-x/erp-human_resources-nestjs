import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaResolver } from './area.resolver';
import { Area } from './entities/area.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Area])],
  providers: [AreaResolver, AreaService],
  exports: [TypeOrmModule],
})
export class AreaModule {}
