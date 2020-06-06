import { Field, InputType } from 'type-graphql';

@InputType()
export default class BookAuthorConnectInput {
  @Field()
  readonly id: number;
}
