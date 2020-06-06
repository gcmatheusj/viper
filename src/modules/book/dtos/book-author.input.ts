import { Field, InputType } from 'type-graphql';
import BookAuthorConnectInput from './book-author-connect.input';
import AuthorInput from '../../author/dtos/author.input';

@InputType()
export default class BookAuthorInput {
  @Field({ nullable: true })
  readonly connect: BookAuthorConnectInput;

  @Field({ nullable: true })
  readonly create: AuthorInput;
}
