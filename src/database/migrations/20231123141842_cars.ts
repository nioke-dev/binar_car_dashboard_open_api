import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    // activate uuid-ossp in postgres 
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    return knex.schema.createTable('cars', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string("plate", 10).notNullable();
        table.string("manufacture", 20).notNullable();
        table.text("image").notNullable();
        table.string("model", 20).notNullable();
        table.string("type", 100).notNullable();
        table.text("description").notNullable();
        table.string("transmission", 20).notNullable();
        table.integer("capacity").notNullable();
        table.bigint("rentPerDay").notNullable();
        table.datetime("availableAt").notNullable();
        table.boolean("available").notNullable().defaultTo(false);
        table.integer("year", 4).notNullable();
        
        table.jsonb('options');
        table.jsonb('specs');

        table.uuid("createdBy").notNullable();
        table.foreign("createdBy").references("users.id").onDelete("SET NULL");
        table.uuid("updatedBy").notNullable();
        table.foreign("updatedBy").references("users.id").onDelete("SET NULL");
        table.uuid("deletedBy").nullable().defaultTo(null);
        table.foreign("deletedBy").references("users.id").onDelete("SET NULL");
        table.datetime("deletedAt").nullable().defaultTo(null);

        table.timestamps(true, true);

        

        
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cars');
}

