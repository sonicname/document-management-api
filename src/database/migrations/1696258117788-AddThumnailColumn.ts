import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddThumnailColumn1696258117788 implements MigrationInterface {
  name = 'AddThumnailColumn1696258117788';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_3253ec422c563ec25014fdba581"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "UQ_3253ec422c563ec25014fdba581"`,
    );
    await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "thumpnail_id"`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "UQ_f1326fde621b704a33759e54fe5" UNIQUE ("thumbnail_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_f1326fde621b704a33759e54fe5" FOREIGN KEY ("thumbnail_id") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_f1326fde621b704a33759e54fe5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "UQ_f1326fde621b704a33759e54fe5"`,
    );
    await queryRunner.query(`ALTER TABLE "post" ADD "thumpnail_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "UQ_3253ec422c563ec25014fdba581" UNIQUE ("thumpnail_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_3253ec422c563ec25014fdba581" FOREIGN KEY ("thumpnail_id") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
