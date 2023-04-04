import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingerAlbumController } from './singer-album.controller';
import { SingerAlbum } from './singer-album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SingerAlbum])],
  controllers: [SingerAlbumController],
})
export class SingerAlbumModule {}
