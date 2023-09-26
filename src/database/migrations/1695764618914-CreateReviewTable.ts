import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReviewTable1695764618914 implements MigrationInterface {
  name = 'CreateReviewTable1695764618914';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "user_id"`);
    await queryRunner.query(
      `ALTER TABLE "review" ADD "user_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_3df2f1f5f615305b9cea2cc36ca" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_81446f2ee100305f42645d4d6c2" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_81446f2ee100305f42645d4d6c2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_3df2f1f5f615305b9cea2cc36ca"`,
    );
    await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "user_id"`);
    await queryRunner.query(`ALTER TABLE "review" ADD "user_id" uuid NOT NULL`);
  }
}
