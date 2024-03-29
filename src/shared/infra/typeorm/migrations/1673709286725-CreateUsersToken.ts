import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersToken1673709286725 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_tokens",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "refresh_token", type: "varchar" },
          { name: "user_id", type: "uuid" },
          { name: "expires_date", type: "timestamp" },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
        foreignKeys: [
          {
            name: "FKUserToken",
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            columnNames: ["user_id"],
            onDelete: "CASCADE",
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_tokens")
  }
}
