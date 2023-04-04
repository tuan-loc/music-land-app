import { Gender } from 'src/commons/enums/gender.enum';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Favorite } from '../favorite/favorite.entity';

@Entity('profiles')
@Unique(['phone'])
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  gender: Gender;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  image: string;

  @OneToOne(
    type => User,
    user => user.profile,
    { eager: true },
  )
  user: User;

  @OneToOne(
    type => Favorite,
    favorite => favorite.profile,
  )
  @JoinColumn()
  favorite: Favorite;

  @Column()
  favoriteId: number;
}
