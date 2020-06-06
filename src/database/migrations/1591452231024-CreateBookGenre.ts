import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBookGenre1591452231024 implements MigrationInterface {
  private genreBookTable = new Table({
    name: 'books_genres',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'book_id',
        type: 'uuid',
      },
      {
        name: 'genre_id',
        type: 'uuid',
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.genreBookTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.genreBookTable);
  }
}
