import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import RepositoryService from '../../repository/repository.service';
import Author from './author.entity';
import AuthorInput from './dtos/author.input';

@Resolver()
class AuthorResolver {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Query(() => [Author])
  public async getAuthors(): Promise<Author[]> {
    return this.repositoryService.authorRepository.find();
  }

  @Query(() => Author, { nullable: true })
  public async getAuthor(
    @Args('id') id: string,
  ): Promise<Author> {
    return this.repositoryService.authorRepository.findOne(id);
  }

  @Mutation(() => Author)
  public async createAuthor(
    @Args('data') input: AuthorInput,
  ): Promise<Author> {
    const author = this.repositoryService.authorRepository.create({ name: input.name });

    return this.repositoryService.authorRepository.save(author);
  }
}

export default AuthorResolver;
