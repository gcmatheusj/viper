import { Field, InputType } from 'type-graphql';
import BookAuthorInput from './book-author.input';

@InputType()
class BookInput {
  @Field()
  readonly title: string;

  @Field()
  readonly author: BookAuthorInput;
}

export default BookInput;
