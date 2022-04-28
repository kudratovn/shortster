"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1651124302712 = void 0;
class Init1651124302712 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE urls (
                id character varying NOT NULL,
                url character varying NOT NULL,
                short_code character varying NOT NULL,
                times_redeemed integer NOT NULL DEFAULT 0,
                created_at timestamp NOT NULL DEFAULT NOW(),
                updated_at timestamp DEFAULT NULL
            );`);
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE urls');
    }
}
exports.Init1651124302712 = Init1651124302712;
//# sourceMappingURL=1651124302712-Init.js.map