import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1697865795349 implements MigrationInterface {
  name = 'CreateTable1697865795349';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category-post" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_d73bcffc463f784e8bfde5180d0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "socialId" character varying, "firstName" character varying, "lastName" character varying, "hash" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "photoId" uuid, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "user" ("hash") `,
    );
    await queryRunner.query(
      `CREATE TABLE "review-post" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "rating" integer NOT NULL DEFAULT '0', "description" character varying NOT NULL, "postID" uuid NOT NULL, "reviewerID" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_ef07f8908e8d8b0e70f355299f7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "document-post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "authorID" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "thumbnailId" uuid, "fileId" uuid, CONSTRAINT "PK_c2df0c310284bfc7a245f2c11bf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "forgot" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_087959f5bb89da4ce3d763eab75" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_df507d27b0fb20cd5f7bef9b9a" ON "forgot" ("hash") `,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "document-post_category_category-post" ("documentPostId" uuid NOT NULL, "categoryPostId" integer NOT NULL, CONSTRAINT "PK_3b281eb47675e0ce70b688e953a" PRIMARY KEY ("documentPostId", "categoryPostId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ae4e9a23b83c757c19bd7c59e8" ON "document-post_category_category-post" ("documentPostId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8ed54c681278f0f4b41112b0d9" ON "document-post_category_category-post" ("categoryPostId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "review-post" ADD CONSTRAINT "FK_85123879e50f92041196e3e3a9c" FOREIGN KEY ("postID") REFERENCES "document-post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "review-post" ADD CONSTRAINT "FK_9866830776feadfafc32ad77ee8" FOREIGN KEY ("reviewerID") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document-post" ADD CONSTRAINT "FK_be798a8d291aca6102c03774854" FOREIGN KEY ("thumbnailId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document-post" ADD CONSTRAINT "FK_99e391487a00a8b89adb14dcfba" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document-post" ADD CONSTRAINT "FK_f3e357cb5eb2b495dd17deffcb7" FOREIGN KEY ("authorID") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "forgot" ADD CONSTRAINT "FK_31f3c80de0525250f31e23a9b83" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "document-post_category_category-post" ADD CONSTRAINT "FK_ae4e9a23b83c757c19bd7c59e8c" FOREIGN KEY ("documentPostId") REFERENCES "document-post"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "document-post_category_category-post" ADD CONSTRAINT "FK_8ed54c681278f0f4b41112b0d92" FOREIGN KEY ("categoryPostId") REFERENCES "category-post"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "document-post_category_category-post" DROP CONSTRAINT "FK_8ed54c681278f0f4b41112b0d92"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document-post_category_category-post" DROP CONSTRAINT "FK_ae4e9a23b83c757c19bd7c59e8c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "forgot" DROP CONSTRAINT "FK_31f3c80de0525250f31e23a9b83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document-post" DROP CONSTRAINT "FK_f3e357cb5eb2b495dd17deffcb7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document-post" DROP CONSTRAINT "FK_99e391487a00a8b89adb14dcfba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document-post" DROP CONSTRAINT "FK_be798a8d291aca6102c03774854"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review-post" DROP CONSTRAINT "FK_9866830776feadfafc32ad77ee8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review-post" DROP CONSTRAINT "FK_85123879e50f92041196e3e3a9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8ed54c681278f0f4b41112b0d9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ae4e9a23b83c757c19bd7c59e8"`,
    );
    await queryRunner.query(
      `DROP TABLE "document-post_category_category-post"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_df507d27b0fb20cd5f7bef9b9a"`,
    );
    await queryRunner.query(`DROP TABLE "forgot"`);
    await queryRunner.query(`DROP TABLE "document-post"`);
    await queryRunner.query(`DROP TABLE "review-post"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e282acb94d2e3aec10f480e4f6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "category-post"`);
  }
}
