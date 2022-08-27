import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1661584959545 implements MigrationInterface {
    name = 'CreateTables1661584959545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."applicant_categories_enum" AS ENUM('nodejs', 'angular', 'javascript', 'react')`);
        await queryRunner.query(`CREATE TYPE "public"."applicant_level_enum" AS ENUM('junior', 'middle', 'senior')`);
        await queryRunner.query(`CREATE TABLE "applicant" ("id" SERIAL NOT NULL, "email" character varying(50) NOT NULL, "categories" "public"."applicant_categories_enum" array NOT NULL, "japaneseKnowledge" boolean NOT NULL DEFAULT false, "level" "public"."applicant_level_enum" NOT NULL, CONSTRAINT "UQ_fbdc0939b42357f11221d81c489" UNIQUE ("email"), CONSTRAINT "PK_f4a6e907b8b17f293eb073fc5ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."position_category_enum" AS ENUM('nodejs', 'angular', 'javascript', 'react')`);
        await queryRunner.query(`CREATE TYPE "public"."position_level_enum" AS ENUM('junior', 'middle', 'senior')`);
        await queryRunner.query(`CREATE TABLE "position" ("id" SERIAL NOT NULL, "category" "public"."position_category_enum" NOT NULL, "level" "public"."position_level_enum" NOT NULL, "company" character varying(100) NOT NULL, "description" character varying(1000), "japaneseRequired" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b7f483581562b4dc62ae1a5b7e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "position"`);
        await queryRunner.query(`DROP TYPE "public"."position_level_enum"`);
        await queryRunner.query(`DROP TYPE "public"."position_category_enum"`);
        await queryRunner.query(`DROP TABLE "applicant"`);
        await queryRunner.query(`DROP TYPE "public"."applicant_level_enum"`);
        await queryRunner.query(`DROP TYPE "public"."applicant_categories_enum"`);
    }

}
