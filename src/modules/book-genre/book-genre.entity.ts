import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import Genre from '../genre/genre.entity';
import Book from '../book/book.entity';

@ObjectType()
@Entity()
export default class BookGenre {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @PrimaryColumn({ name: 'book_id' })
  bookId: string;

  @Field()
  @PrimaryColumn({ name: 'genre_id' })
  genreId: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Book, book => book.genreConnection, { primary: true })
  @JoinColumn({ name: 'book_id' })
  book: Book[];

  @ManyToOne(() => Genre, genre => genre.bookConnection, { primary: true })
  @JoinColumn({ name: 'genre_id' })
  genre: Genre[];
}
