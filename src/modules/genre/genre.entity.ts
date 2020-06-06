import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import BookGenre from '../book-genre/book-genre.entity';

@ObjectType()
@Entity()
export default class Genre {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ name: 'genre_name' })
  name: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => BookGenre, bookGenre => bookGenre.book)
  bookConnection: Promise<BookGenre[]>;
}
