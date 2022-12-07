/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('messages').del()
  await knex('messages').insert([
    {author: 'authos1@email.com',time:"25/11/2022, 18:25:49",text:"Primer mensaje"},
    {author: 'authos2@email.com',time:"25/11/2022, 18:26:11",text:"Segundo mensaje mensaje"},
    {author: 'authos1@email.com',time:"25/11/2022, 19:25:29",text:"En respuesta"}
  ]);
};
