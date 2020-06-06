import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import BookGenre from '../../book-genre/entity/book-genre';

@Entity()
export default class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'genre_name' })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => BookGenre, bookGenre => bookGenre.book)
  bookConnection: Promise<BookGenre[]>;
}
