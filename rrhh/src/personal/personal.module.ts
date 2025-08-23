import { Module } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personal} from  './entities/personal.entity'
import { PersonalResolver } from './personal.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Personal])],
  controllers: [],
  providers: [PersonalService,PersonalResolver],
  exports: [PersonalService], 
})
export class PersonalModule {}
