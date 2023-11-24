import { table } from "console";
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
        table.increments('id');
        table.string("email", 255).notNullable;
        table.text("password").notNullable;
        table.string("level", 255).notNullable;
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users')
}

