import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { AppService } from './app.service';
import RepositoryModule from './repository/repository.module';

import AuthorResolver from './modules/author/author.resolvers';
import BookResolver from './modules/book/book.resolvers';
import GenreResolver from './modules/genre/genre.resolvers';
import BookGenreResolver from './modules/book-genre/book-genre.resolvers';

const graphQLImports = [
  AuthorResolver,
  BookResolver,
  GenreResolver,
  BookGenreResolver,
];

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    RepositoryModule,
    ...graphQLImports,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
