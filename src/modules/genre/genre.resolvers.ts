import { Args, Context, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';

import { IGraphQLContext } from '../../types/graphql.types';

import RepoService from '../../repository/repository.service';
import Book from '../book/book.entity';
import Genre from '../genre/genre.entity';
import GenreInput from './dtos/genre.input';

@Resolver(Genre)
class GenreResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Genre])
  public async getGenres(): Promise<Genre[]> {
    return this.repoService.genreRepository.find();
  }

  @Query(() => Genre, {nullable: true})
  public async getGenre(@Args('id') id: string): Promise<Genre> {
    return this.repoService.genreRepository.findOne(id);
  }

  @Mutation(() => Genre)
  public async createGenre(@Args('data') input: GenreInput): Promise<Genre> {
    const genre = new Genre();
    genre.name = input.name;
    return this.repoService.genreRepository.save(genre);
  }

  @ResolveProperty()
  public async book(
    @Parent() parent: Genre,
    @Context() { genreBooksLoader }: IGraphQLContext,
  ): Promise<Book[]> {
    return genreBooksLoader.load(parent.id);
  }
}

export default GenreResolver;
