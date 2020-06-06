import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import BookGenre from '../../book-genre/entity/book-genre';
import Author from '../../author/entity/author';

@ObjectType()
@Entity({ name: 'books' })
export default class Book {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ name: 'author_id' })
  authorId: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => Author)
  author: Author;

  @ManyToOne(() => Author, author => author.bookConnection, { primary: true })
  @JoinColumn({ name: 'author_id'})
  authorConnection: Promise<Author>;

  @OneToMany(() => BookGenre, bookGenre => bookGenre.genre)
  genreConnection: Promise<BookGenre[]>;
}
