import { Field, InputType } from 'type-graphql';

@InputType()
export default class GenreBookInput {
  @Field()
  readonly genreId: string;

  @Field()
  readonly bookId: string;
}
