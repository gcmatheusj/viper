import { Parent, Args, Mutation, Query, Resolver, ResolveProperty } from '@nestjs/graphql';
import RepositoryService from '../../repository/repository.service';
import Author from '../author/author.entity';
import Book from '../book/book.entity';
import BookInput from './dtos/book.input';

@Resolver(Book)
export default class BookResolver {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Query(() => [Book])
  public async getBooks(): Promise<Book[]> {
    return this.repositoryService.bookRepository.find();
  }

  @Query(() => Book, { nullable: true })
  public async getBook(
    @Args('id') id: string,
  ): Promise<Book> {
    return this.repositoryService.bookRepository.findOne(id);
  }

  @Mutation(() => Book)
  public async createBook(
    @Args('data') input: BookInput,
  ): Promise<Book> {
    const book = this.repositoryService
      .bookRepository
      .create({ title: input.title });

    return this.repositoryService.bookRepository.save(book);
  }

  @ResolveProperty()
  public async author(
    @Parent() parent: Book,
  ): Promise<Author> {
    return this.repositoryService.authorRepository.findOne(parent.authorId);
  }
}
