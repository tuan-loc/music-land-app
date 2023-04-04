import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistType } from 'src/commons/enums/artist-type.enum';
import { Gender } from 'src/commons/enums/gender.enum';
import { CreateAlbumDto } from 'src/shared/dto/create-album.dto';
import { SingerService } from './singer.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('singers')
export class SingerController {
  constructor(private singerService: SingerService) {}

  @Get()
  getAllSingers() {
    return this.singerService.getAllSingers();
  }

  @Get('filtered')
  getFilteredSingers(
    @Query('limit') limit: number,
    @Query('type') type: ArtistType,
    @Query('nationality') nationality: string,
    @Query('gender') gender: Gender,
  ) {
    return this.singerService.getFilteredSingers(
      limit,
      nationality,
      type,
      gender,
    );
  }

  @Get('limited')
  getLimitedSingers(@Query('limit') limit: number) {
    return this.singerService.getLimitedSingers(limit);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createNewSinger(
    @Body('name') name: string,
    @Body('info') info: string,
    @Body('gender') gender: Gender,
    @Body('nationality') nationality: string,
    @Body('type') type: ArtistType,
    @UploadedFile() image: any,
  ) {
    return this.singerService.createNewSinger(
      name,
      info,
      gender,
      type,
      nationality,
      image,
    );
  }

  @Get(':id')
  getSingerById(@Param('id') id: number) {
    return this.singerService.getSingerById(id);
  }

  @Post(':id/new-album')
  createNewAlbum(
    @Param('id') id: number,
    @Body('createAlbumDto')
    createAlbumDto: CreateAlbumDto,
  ) {
    return this.singerService.createNewAlbum(id, createAlbumDto);
  }

  @Put(':id/update-singer')
  updateSinger(
    @Param('id') id: number,
    @Body('createAlbumDto')
    createAlbumDto: CreateAlbumDto,
  ) {
    const { name } = createAlbumDto;
    return { id, name };
  }

  @Delete(':id/delete-singer')
  deleteSinger(@Param('id') id: number) {
    return this.singerService.deleteSinger(id);
  }
}
