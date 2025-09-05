import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1757100054260 implements MigrationInterface {
    name = 'InitSchema1757100054260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."personal_genero_enum" AS ENUM('F', 'M', 'X')`);
        await queryRunner.query(`CREATE TYPE "public"."personal_estadolaboral_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "personal" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "usuarioId" uuid NOT NULL, "dni" character varying(8) NOT NULL, "nombre" character varying(45) NOT NULL, "apellidoPaterno" character varying(45) NOT NULL, "apellidoMaterno" character varying(45) NOT NULL, "genero" "public"."personal_genero_enum" NOT NULL, "fechaNacimiento" date, "direccion" character varying(45) NOT NULL, "telefono" character varying(11) NOT NULL, "estadoLaboral" "public"."personal_estadolaboral_enum" NOT NULL DEFAULT '1', "status" integer NOT NULL DEFAULT '1', CONSTRAINT "UQ_7cd67e66979a904324a56a17002" UNIQUE ("dni"), CONSTRAINT "UQ_5df0e02f2804053ea5c0ca2d124" UNIQUE ("telefono"), CONSTRAINT "PK_7a849a61cdfe8eee39892d7b1b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."contrato_estado_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "contrato" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fechaInicio" date NOT NULL, "fechaSalida" TIMESTAMP NOT NULL, "estado" "public"."contrato_estado_enum" NOT NULL DEFAULT '1', "personalId" uuid NOT NULL, "areaIdarea" uuid, CONSTRAINT "PK_b82cfcedf2037eab18ca2714ef9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."area_are_estado_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "area" ("idarea" uuid NOT NULL DEFAULT uuid_generate_v4(), "ARE_nombre" character varying(45) NOT NULL, "ARE_estado" "public"."area_are_estado_enum" NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_78cd173450c37a9351b0f8efd5e" PRIMARY KEY ("idarea"))`);
        await queryRunner.query(`ALTER TABLE "personal" ADD CONSTRAINT "FK_7c9f9239a8132547837f6fdf48b" FOREIGN KEY ("usuarioId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_4235d49756711a02d236fa0cc7c" FOREIGN KEY ("personalId") REFERENCES "personal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contrato" ADD CONSTRAINT "FK_c58728c44e57e40035d9cfba31d" FOREIGN KEY ("areaIdarea") REFERENCES "area"("idarea") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_c58728c44e57e40035d9cfba31d"`);
        await queryRunner.query(`ALTER TABLE "contrato" DROP CONSTRAINT "FK_4235d49756711a02d236fa0cc7c"`);
        await queryRunner.query(`ALTER TABLE "personal" DROP CONSTRAINT "FK_7c9f9239a8132547837f6fdf48b"`);
        await queryRunner.query(`DROP TABLE "area"`);
        await queryRunner.query(`DROP TYPE "public"."area_are_estado_enum"`);
        await queryRunner.query(`DROP TABLE "contrato"`);
        await queryRunner.query(`DROP TYPE "public"."contrato_estado_enum"`);
        await queryRunner.query(`DROP TABLE "personal"`);
        await queryRunner.query(`DROP TYPE "public"."personal_estadolaboral_enum"`);
        await queryRunner.query(`DROP TYPE "public"."personal_genero_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
