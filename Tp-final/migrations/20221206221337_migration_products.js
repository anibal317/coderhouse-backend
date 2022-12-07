/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema

        .createTable('products', function (table) {
            table.increments('id');
            table.string('title', 15).notNullable();
            table.string('thumbnail', 255).notNullable();
            table.float('price').notNullable();
            table.integer('stock').notNullable();
        })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = function (knex) {
    return knex.schema
        .dropTable("products")
};