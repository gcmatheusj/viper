import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import RepositoryService from './repository.service';

import Author from '../modules/author/entity/author';
import Book from '../modules/book/entity/book';
import Genre from '../modules/genre/entity/genre';
import BookGenre from '../modules/book-genre/entity/book-genre';

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
