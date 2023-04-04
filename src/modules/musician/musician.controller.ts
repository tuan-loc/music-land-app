import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArtistType } from 'src/commons/enums/artist-type.enum';
import { Gender } from 'src/commons/enums/gender.enum';
import { CreateAlbumDto } from 'src/shared/dto/create-album.dto';

@Controller('musicians')
export class MusicianController {
  @Get()
  getAllMusicians() {
    return 'get musician';
  }

  @Get('filtered')
  getFilteredMusicians(
    @Query('limit') limit: number,
    @Query('type') type: ArtistType,
    @Query('nationality') nationality: string,
    @Query('gender') gender: Gender,
  ) {
    return { limit, type, nationality, gender };
  }

  @Get('limited')
  getLimitedMusicians(@Query('limit') limit: number) {
    return { limit };
  }

  @Post()
  createNewMusician() {
    return 'create musician';
  }

  @Get(':id')
  getMusicianById(@Param('id') id: number) {
    return `get musician by ${id}`;
  }

  @Post(':id/new-album')
  createNewAlbum(
    @Param('id') id: number,
    @Body('createAlbumDto')
    createAlbumDto: CreateAlbumDto,
  ) {
    const { name } = createAlbumDto;
    return { id, name };
  }

  @Put(':id/update-musician')
  updateMusician(
    @Param('id') id: number,
    @Body('createAlbumDto')
    createAlbumDto: CreateAlbumDto,
  ) {
    const { name } = createAlbumDto;
    return { id, name };
  }

  @Delete(':id/delete-musician')
  deleteMusician(@Param('id') id: number) {
    return 'delete mus' + id;
  }
}
