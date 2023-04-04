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
import { SongLanguage } from 'src/commons/enums/song-language.enum';

@Controller('songs')
export class SongController {
  @Get()
  getAllSongs() {
    return 'all musics';
  }

  @Get(':id')
  getSongById(@Param('id') id: number) {
    return 'all musics';
  }

  @Get('limited')
  getLimitedSongs(@Query('limit') limit: number) {
    return 'all musics limited';
  }

  @Get('filtered')
  getFilteredSongs(
    @Query('limit') limit: number,
    @Query('type') type: MusicType,
    @Query('language') language: SongLanguage,
    @Query('rate') rate: number,
  ) {
    return { limit, type, rate, language };
  }

  @Put(':id/update-song')
  updateSong(@Param('id') id: number) {
    return 'updateting misuc';
  }

  @Delete(':id/delete-song')
  delete(@Param('id') id: number) {
    return 'updateting misuc';
  }

  @Post(':songId/add-to-playlist/:playlistId')
  addToPlaylist(
    @Param('songId') songId: number,
    @Param('playlistId') playlistId: number,
  ) {
    return 'updateting misuc';
  }

  @Post(':songId/save-to-favorite-list/:favoriteId')
  saveToFavoriteList(
    @Param('songId') songId: number,
    @Param('favoriteId') favoriteId: number,
  ) {
    return 'updateting misuc';
  }
}
