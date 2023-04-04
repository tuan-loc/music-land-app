import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MusicType } from 'src/commons/enums/music-type.enum';

@Controller('musics')
export class MusicController {
  @Get()
  getAllMusics() {
    return 'all musics';
  }

  @Get(':id')
  getMusicById(@Param('id') id: number) {
    return 'all musics';
  }

  @Get('limited')
  getLimitedMusics(@Query('limit') limit: number) {
    return 'all musics limited';
  }

  @Get('filtered')
  getFilteredMusics(
    @Query('limit') limit: number,
    @Query('type') type: MusicType,
    @Query('rate') rate: number,
  ) {
    return { limit, type, rate };
  }

  @Put(':id/update-music')
  updateMusic(@Param('id') id: number) {
    return 'updateting misuc';
  }

  @Delete(':id/delete-music')
  delete(@Param('id') id: number) {
    return 'updateting misuc';
  }

  @Post(':musicId/add-to-playlist/:playlistId')
  addToPlaylist(
    @Param('musicId') musicId: number,
    @Param('playlistId') playlistId: number,
  ) {
    return 'updateting misuc';
  }

  @Post(':musicId/save-to-favorite-list/:favoriteId')
  saveToFavoriteList(
    @Param('musicId') musicId: number,
    @Param('favoriteId') favoriteId: number,
  ) {
    return 'updateting misuc';
  }
}
