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

import Genre from '../../genre/entity/genre';
import Book from '../../book/entity/book';

@Entity()
export default class BookGenre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn({ name: 'book_id' })
  bookId: string;

  @PrimaryColumn({ name: 'genre_id' })
  genreId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Book, book => book.genreConnection, { primary: true })
  @JoinColumn({ name: 'book_id' })
  book: Book[];

  @ManyToOne(() => Genre, genre => genre.bookConnection, { primary: true })
  @JoinColumn({ name: 'genre_id' })
  genre: Genre[];
}
