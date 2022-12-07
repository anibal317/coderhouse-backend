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
            table.string('text', 250).notNullable();
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable("messages")
};

exports.config = { transaction: false };