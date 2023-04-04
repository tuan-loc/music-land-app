import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistType } from 'src/commons/enums/artist-type.enum';
import { Gender } from 'src/commons/enums/gender.enum';
import { CreateAlbumDto } from 'src/shared/dto/create-album.dto';
import { DeleteResult } from 'typeorm';
import { SingerAlbum } from '../singer-album/singer-album.entity';
import { Singer } from './singer.entity';
import { SingerRepository } from './singer.repository';
import { AwsService } from 'src/shared/modules/aws/aws.service';

@Injectable()
export class SingerService {
  constructor(
    @InjectRepository(SingerRepository)
    private singerRepository: SingerRepository,
    private awsService: AwsService,
  ) {}

  async getAllSingers(): Promise<Singer[]> {
    return await this.singerRepository.find();
  }

  async getLimitedSingers(limit: number): Promise<Singer[]> {
    return await this.singerRepository.getLimitedSingers(limit);
  }

  async getFilteredSingers(
    limit: number,
    nationality: string,
    type: ArtistType,
    gender: Gender,
  ): Promise<Singer[]> {
    return await this.singerRepository.getFilteredSingers(
      limit,
      nationality,
      type,
      gender,
    );
  }

  async getSingerById(id: number): Promise<Singer> {
    const singer = await this.singerRepository.findOne({ where: { id } });
    if (!singer) {
      throw new NotFoundException(`Singer with id ${id} does not found!`);
    }
    return singer;
  }

  async createNewSinger(
    name: string,
    info: string,
    gender: Gender,
    type: ArtistType,
    nationality: string,
    image: any,
  ): Promise<Singer> {
    const singer = new Singer();
    singer.name = name;
    singer.info = info;
    singer.gender = gender;
    singer.nationality = nationality;
    singer.type = type;
    singer.image = await this.awsService.fileUpload(image, 'singer-images');
    singer.singerAlbums = [];
    const savedSinger = await singer.save();
    return singer;
  }

  async updateSinger(
    id: number,
    name: string,
    info: string,
    gender: Gender,
    nationality: string,
    type: ArtistType,
    image: any,
  ): Promise<Singer> {
    const singer = await this.getSingerById(id);
    if (name) {
      singer.name = name;
    }
    if (info) {
      singer.info = info;
    }
    if (gender) {
      singer.gender = gender;
    }
    if (nationality) {
      singer.nationality = nationality;
    }
    if (type) {
      singer.type = type;
    }
    if (image) {
      singer.image = image;
    }
    const savedSinger = await singer.save();
    return singer;
  }

  async deleteSinger(singerId: number): Promise<DeleteResult> {
    const result = await this.singerRepository.delete(singerId);
    if (result.affected === 0) {
      throw new NotFoundException(`Singer with id ${singerId} does not found`);
    }
    return result;
  }

  async createNewAlbum(
    singerId: number,
    createAlbumDto: CreateAlbumDto,
  ): Promise<SingerAlbum> {
    const singer = await this.getSingerById(singerId);
    const singerAlbum = new SingerAlbum();
    const { name } = createAlbumDto;
    singerAlbum.name = name;
    singerAlbum.singer = singer;
    singerAlbum.image = singer.image;
    const savedSingerAlbum = await singerAlbum.save();
    return savedSingerAlbum;
  }
}
