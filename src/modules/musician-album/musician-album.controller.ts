import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateAlbumDto } from 'src/shared/dto/create-album.dto';

@Controller('musician-albums')
export class MusicianAlbumController {
  @Get()
  getAllMusicianAlbums() {
    return 'musician albums';
  }

  @Get(':id')
  getMusicianAlbums(@Param('id') id: number) {
    return 'musician albums';
  }

  @Post(':id/new-song')
  createNewMusic(@Param('id') id: number, @Body() musicData: any) {
    return 'musician albums';
  }

  @Put(':id/update-album')
  updateAlbum(
    @Param('id') id: number,
    @Body('createAlbumDto') createAlbumDto: CreateAlbumDto,
  ) {
    const { name } = createAlbumDto;
    return { id, name };
  }

  @Delete(':id/delete-album')
  deleteAlbum(@Param('id') id: number) {
    return 'album';
  }
}
