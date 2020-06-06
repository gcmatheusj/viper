import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import RepoService from '../../repository/repository.service';

import BookGenre from './book-genre.entity';
import BookGenreInput from './dtos/book-genre.input';
import { Arg } from 'type-graphql';

@Resolver()
export default class BookGenreResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [BookGenre])
  public async bookGenres(): Promise<BookGenre[]> {
    return this.repoService.bookGenreRepository.find();
  }

  @Query(() => BookGenre)
  public async bookGenre(@Arg('id') id: string): Promise<BookGenre> {
    return this.repoService.bookGenreRepository.findOne(id);
  }

  @Mutation(() => BookGenre)
  public async createBookGenre(@Args('data') input: BookGenreInput): Promise<BookGenre> {
    const bookGenre = new BookGenre();
    const {bookId, genreId} = input;
    bookGenre.bookId = bookId;
    bookGenre.genreId = genreId;
    return this.repoService.bookGenreRepository.save(bookGenre);
  }
}
