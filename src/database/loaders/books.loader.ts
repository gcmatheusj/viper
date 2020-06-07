import DataLoader from 'dataloader';
import { getRepository } from 'typeorm';

import Book from '../../modules/book/book.entity';
import BookGenre from '../../modules/book-genre/book-genre.entity';

const batchBooks = async (genreIds: string[]) => {
  const bookGenres = await getRepository(BookGenre)
    .createQueryBuilder('bookGenres')
    .leftJoinAndSelect('bookGenres.book', 'book')
    .where('bookGenres.id IN(:...ids)', {ids: genreIds})
    .getMany();

  const genreIdToBooks: {[key: string]: Book[]} = {};

  bookGenres.forEach(bookGenre => {
    if (!genreIdToBooks[bookGenre.genreId]) {
      genreIdToBooks[bookGenre.genreId] = [(bookGenre as any).__book__];
    } else {
      genreIdToBooks[bookGenre.genreId].push((bookGenre as any).__book__);
    }
  });

  return genreIds.map(genreId => genreIdToBooks[genreId]);
};

const genreBooksLoader = () => new DataLoader(batchBooks);

export {
  genreBooksLoader,
};
