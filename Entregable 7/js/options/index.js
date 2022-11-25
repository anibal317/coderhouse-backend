const options = {
  client: 'sqlite3',
  connection: {
    filename: "../../files/db/ecommerce.sqlite"
  }
}

const msgOptions = {
  client: 'sqlite3',
  connection: {
    filename: "./messages.sqlite"
  }
}

module.exports = { options,msgOptions };
