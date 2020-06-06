import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGenre1591452222554 implements MigrationInterface {
  private genreTable = new Table({
    name: 'genres',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'genre_name',
        type: 'varchar',
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
    await queryRunner.createTable(this.genreTable);
  }

  public async down(queryRunner: QueryRunner): Promise < void > {
    await queryRunner.dropTable(this.genreTable);
  }
}
