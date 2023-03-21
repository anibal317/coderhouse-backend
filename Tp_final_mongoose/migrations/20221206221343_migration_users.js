/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema
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
        .dropTable("users")
};