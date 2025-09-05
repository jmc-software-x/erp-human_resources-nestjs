import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCargoEstado1757105635497 implements MigrationInterface {
    name = 'UpdateCargoEstado1757105635497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."cargo_estado_enum" AS ENUM('I', 'A', 'S')`);
        await queryRunner.query(`CREATE TABLE "cargo" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "estado" "public"."cargo_estado_enum" NOT NULL DEFAULT 'A', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "areaIdarea" uuid, CONSTRAINT "PK_1af8b2a790f35aedbe7e3da4199" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cargo" ADD CONSTRAINT "FK_7a0fdac986d7602c512cb53db67" FOREIGN KEY ("areaIdarea") REFERENCES "area"("idarea") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cargo" DROP CONSTRAINT "FK_7a0fdac986d7602c512cb53db67"`);
        await queryRunner.query(`DROP TABLE "cargo"`);
        await queryRunner.query(`DROP TYPE "public"."cargo_estado_enum"`);
    }

}
