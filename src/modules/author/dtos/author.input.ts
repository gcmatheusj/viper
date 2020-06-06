import { Field, InputType } from 'type-graphql';

@InputType()
export default class AuthorInput {
  @Field()
  readonly name: string;
}
