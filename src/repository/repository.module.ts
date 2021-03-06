import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import RepositoryService from './repository.service';

import Author from '../modules/author/author.entity';
import Book from '../modules/book/book.entity';
import Genre from '../modules/genre/genre.entity';
import BookGenre from '../modules/book-genre/book-genre.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Author,
      Book,
      Genre,
      BookGenre,
    ]),
  ],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export default class RepositoryModule {}
