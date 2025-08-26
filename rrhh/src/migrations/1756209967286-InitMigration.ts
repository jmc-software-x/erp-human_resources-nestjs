import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1756209967286 implements MigrationInterface {
    name = 'InitMigration1756209967286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."personal_genero_enum" AS ENUM('F', 'M', 'X')`);
        await queryRunner.query(`CREATE TYPE "public"."personal_estadolaboral_enum" AS ENUM('A', 'I', 'X')`);
        await queryRunner.query(`CREATE TABLE "personal" ("id" SERIAL NOT NULL, "dni" character varying(8) NOT NULL, "nombre" character varying(45) NOT NULL, "apellidoPaterno" character varying(45) NOT NULL, "apellidoMaterno" character varying(45) NOT NULL, "genero" "public"."personal_genero_enum" NOT NULL, "fechaNacimiento" date, "direccion" character varying(45) NOT NULL, "telefono" character varying(11) NOT NULL, "estadoLaboral" "public"."personal_estadolaboral_enum" NOT NULL DEFAULT 'A', "usuarioId" uuid NOT NULL, "status" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_7a849a61cdfe8eee39892d7b1b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_7c9f9239a8132547837f6fdf48b" FOREIGN KEY ("usuarioId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_7c9f9239a8132547837f6fdf48b"`);
        await queryRunner.query(`DROP TABLE "personal"`);
        await queryRunner.query(`DROP TYPE "public"."personal_estadolaboral_enum"`);
        await queryRunner.query(`DROP TYPE "public"."personal_genero_enum"`);
    }

}
