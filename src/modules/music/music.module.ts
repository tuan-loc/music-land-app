import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicController } from './music.controller';
import { MusicRepository } from './music.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MusicRepository])],
  controllers: [MusicController],
})
export class MusicModule {}
