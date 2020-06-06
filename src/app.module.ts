import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import RepositoryModule from './repository/repository.module';

import AuthorResolver from './modules/author/author.resolvers';

const graphQLImports = [
  AuthorResolver,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
