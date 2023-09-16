import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewColumn1694850009827 implements MigrationInterface {
  name = 'AddNewColumn1694850009827';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "file" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "file" ADD "deletedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "createdAt"`);
  }
}
