import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import Author from '../modules/author/entity/author';
import Book from '../modules/book/entity/book';
import Genre from '../modules/genre/entity/genre';
import BookGenre from '../modules/book-genre/entity/book-genre';

@Injectable()
class RepositoryService {
  public constructor(
    @InjectRepository(Author) public readonly authorRepository: Repository<Author>,
    @InjectRepository(Book) public readonly bookRepository: Repository<Book>,
    @InjectRepository(Genre) public readonly genreRepository: Repository<Genre>,
    @InjectRepository(BookGenre) public readonly bookGenreRepository: Repository<BookGenre>,
  ) {}
}

export default RepositoryService;
