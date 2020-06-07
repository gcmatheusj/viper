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
  public async createBook(@Args('data') input: BookInput): Promise<Book> {
    const book = new Book();
    book.title = input.title;
    if (input.author.connect) {
      book.authorId = input.author.connect.id;
    } else {
      if (!input.author.create) {
        throw new Error('Either pass a valid author id for the book or provide a new author using the create input option');
      }
      const authorToSave = this.repositoryService.authorRepository.create({name: input.author.create.name});
      const savedAuthor = await this.repositoryService.authorRepository.save(authorToSave);
      book.authorId = savedAuthor.id;
    }
    return this.repositoryService.bookRepository.save(book);
  }
  @ResolveProperty()
  public async author(
    @Parent() parent: Book,
  ): Promise<Author> {
    return this.repositoryService.authorRepository.findOne(parent.authorId);
  }
}
