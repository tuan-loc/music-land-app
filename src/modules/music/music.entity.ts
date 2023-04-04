import { AbstractMusic } from 'src/commons/classes/abstract-music';
import { MusicType } from 'src/commons/enums/music-type.enum';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MusicianAlbum } from '../musician-album/musician-album.entity';
import { Track } from '../track/track.entity';

@Entity('musics')
export class Music extends AbstractMusic {
  @Column({ type: 'enum', enum: MusicType, array: false })
  type: MusicType;

  @ManyToOne(
    type => MusicianAlbum,
    musicianAlbum => musicianAlbum.musics,
    { eager: false },
  )
  musicianAlbum: MusicianAlbum;

  @OneToMany(
    type => Track,
    track => track.playlist,
    { eager: true },
  )
  tracks: Track[];

  @Column()
  musicianAlbumId: number;
}
