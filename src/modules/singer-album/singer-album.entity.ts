import { AbstractAlbum } from 'src/commons/classes/abstract-album';
import { Column, Entity, ManyToMany, OneToMany, Unique } from 'typeorm';
import { Singer } from '../singer/singer.entity';
import { Song } from '../song/song.entity';

@Entity('singer-albums')
@Unique(['name'])
export class SingerAlbum extends AbstractAlbum {
  @ManyToMany(
    type => Singer,
    singer => singer.singerAlbums,
  )
  singer: Singer;

  @OneToMany(
    type => Song,
    song => song.singerAlbum,
    { eager: true },
  )
  songs: Song[];

  @Column()
  singerId: number;
}
