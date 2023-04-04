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

@Controller('singer-albums')
export class SingerAlbumController {
  @Get()
  getAllSingerAlbums() {
    return 'singers albums';
  }

  @Get(':id')
  getSingerAlbums(@Param('id') id: number) {
    return 'singers albums';
  }

  @Post(':id/new-song')
  createNewSong(@Param('id') id: number, @Body() songData: any) {
    return 'singers albums';
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
