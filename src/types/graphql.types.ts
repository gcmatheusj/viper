import { genreBooksLoader } from '../database/loaders/books.loader';

export interface IGraphQLContext {
  genreBooksLoader: ReturnType<typeof genreBooksLoader>;
}
