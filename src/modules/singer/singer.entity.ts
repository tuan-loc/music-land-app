import { AbstractArtist } from 'src/commons/classes/abstract-artist';
import { Entity, OneToMany, Unique } from 'typeorm';
import { SingerAlbum } from '../singer-album/singer-album.entity';

@Entity('singers')
@Unique(['name'])
export class Singer extends AbstractArtist {
  @OneToMany(
    type => SingerAlbum,
    singerAlbum => singerAlbum.singer,
    { eager: true },
  )
  singerAlbums: SingerAlbum[];
}
