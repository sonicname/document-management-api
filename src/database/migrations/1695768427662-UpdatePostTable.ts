import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatePostTable1695768427662 implements MigrationInterface {
  name = 'UpdatePostTable1695768427662';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "total_review" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" ALTER COLUMN "total_review" DROP DEFAULT`,
    );
  }
}
