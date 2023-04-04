import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicianAlbumController } from './musician-album.controller';
import { MusicianAlbum } from './musician-album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MusicianAlbum])],
  controllers: [MusicianAlbumController],
})
export class MusicianAlbumModule {}
