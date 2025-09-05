import { Module } from '@nestjs/common';
import { CargoService } from './cargo.service';
import { CargoResolver } from './cargo.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cargo } from './entities/cargo.entity';

@Module({
 imports: [TypeOrmModule.forFeature([Cargo])],
  providers: [CargoResolver, CargoService],
})
export class CargoModule {}
