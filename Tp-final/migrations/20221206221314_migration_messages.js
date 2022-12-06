/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("messages", function (table) {
            table.increments('id');
            table.string('author', 150).notNullable();
            table.string('time', 30).notNullable();
            table.string('ttext', 250).notNullable();
        })
        .createTable('ecommerce', function (table) {
            table.increments('id');
            table.string('title', 15).notNullable();
            table.string('thumbnail', 255).notNullable();
            table.float('price').notNullable();
            table.integer('stock').notNullable();
        })
        .createTable('users', function (table) {
            table.increments('id');
            table.string('name', 250).notNullable();
            table.string('userName', 250).notNullable();
            table.string('pwd', 255).notNullable();
            table.boolean('isAdmin').notNullable();
            table.string('thumbnail', 255).notNullable();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable("eccomerce")
        .dropTable("messages")
        .dropTable("users")
};

exports.config = { transaction: false };