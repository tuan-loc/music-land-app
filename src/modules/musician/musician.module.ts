import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicianController } from './musician.controller';
import { Musician } from './musician.entity';
import { MusicianRepository } from './musician.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MusicianRepository])],
  controllers: [MusicianController],
})
export class MusicianModule {}
