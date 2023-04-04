import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongController } from './song.controller';
import { Song } from './song.entity';
import { SongRepository } from './song.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SongRepository])],
  controllers: [SongController],
})
export class SongModule {}
