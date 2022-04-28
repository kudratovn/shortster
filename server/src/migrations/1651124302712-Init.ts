import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1651124302712 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE urls (
                id character varying NOT NULL,
                url character varying NOT NULL,
                short_code character varying NOT NULL,
                times_redeemed integer NOT NULL DEFAULT 0,
                created_at timestamp NOT NULL DEFAULT NOW(),
                updated_at timestamp NOT NULL
            );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE urls');
    }

}
