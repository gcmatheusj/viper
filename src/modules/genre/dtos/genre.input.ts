import { Field, InputType } from 'type-graphql';

@InputType()
export default class GenreInput {
  @Field()
  readonly name: string;
}
