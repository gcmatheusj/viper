import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import RepoService from '../../repository/repository.service';
import Book from '../book/book.entity';
import Genre from '../genre/genre.entity';
import GenreInput from './dtos/genre.input';

@Resolver(Genre)
class GenreResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Genre])
  public async genres(): Promise<Genre[]> {
    return this.repoService.genreRepository.find();
  }

  @Query(() => Genre, {nullable: true})
  public async genre(@Args('id') id: string): Promise<Genre> {
    return this.repoService.genreRepository.findOne(id);
  }

  @Mutation(() => Genre)
  public async createGenre(@Args('data') input: GenreInput): Promise<Genre> {
    const genre = new Genre();
    genre.name = input.name;
    return this.repoService.genreRepository.save(genre);
  }

  @ResolveProperty()
  public async book(@Parent() parent): Promise<Book[]> {
    const bookGenres = await this.repoService.bookGenreRepository.find({where:
    {genreId: parent.id}, relations: ['book']});
    const books: Book[] = [];
    bookGenres.forEach(async bookGenre => books.push(await
      bookGenre.book));
    return books;
  }
}

export default GenreResolver;
