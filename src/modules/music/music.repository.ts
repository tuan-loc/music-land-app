import { MusicType } from 'src/commons/enums/music-type.enum';
import { EntityRepository, Repository } from 'typeorm';
import { Music } from './music.entity';

@EntityRepository(Music)
export class MusicRepository extends Repository<Music> {
  async getLimitedMusics(limit: number): Promise<Music[]> {
    const query = this.createQueryBuilder('music').select();
    if (limit) {
      query.limit(limit);
    }
    const musics = await query
      .leftJoinAndSelect('music.tracks', 'track')
      .getMany();
    return musics;
  }

  async getFilteredMusics(
    limit: number,
    type: MusicType,
    rate: number,
  ): Promise<Music[]> {
    const query = this.createQueryBuilder('music').select();
    if (limit) {
      query.limit(limit);
    }
    if (type) {
      query.where('music.type LIKE :type', { type });
    }
    if (rate) {
      query.andWhere('music.rate = :rate', { rate });
    }
    const musics = await query
      .leftJoinAndSelect('music.tracks', 'track')
      .getMany();
    return musics;
  }
}
