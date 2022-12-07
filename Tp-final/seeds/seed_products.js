/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert([
    {
      title: "Escuadra",
      price: 123.45,
      thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
      stock: 10
    },
    {
      title: "Calculadora",
      price: 234.56,
      thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
      stock: 10
    },
    {
      title: "Globo Terráqueo",
      price: 345.67,
      thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
      stock: 10
    },
    {
      title: "Cartuchera",
      price: 100.25,
      thumbnail: "https://cdn-icons-png.flaticon.com/512/4100/4100658.png",
      stock: 10
    },
    {
      title: "Set de 3 cuadernos",
      price: "1550.2",
      thumbnail: "1661984749237-Cuadernos-3-unidades.jpg",
      stock: 10
    },
    {
      title: "Tijera",
      price: "125",
      thumbnail: "1661984816625-tijera.jpg",
      stock: 10
    },
    {
      title: "Set de escuadras por 3 unidades",
      price: "1500",
      thumbnail: "1661985267308-escuadras-3-unidades.jpg",
      stock: 10
    }
  ]);
};
