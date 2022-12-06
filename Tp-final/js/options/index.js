const productsOptions = {
  client: 'sqlite3',
  connection: {
    filename: "../../public/db/ecommerce.sqlite"
  },
  useNullAsDefault: true
}

const msgOptions = {
  client: 'sqlite3',
  connection: {
    filename: "../../public/db/messages.sqlite"
  },
  useNullAsDefault: true
}
const usersOptions = {
  client: 'sqlite3',
  connection: {
    filename: "../../public/db/users.sqlite"
  },
  useNullAsDefault: true
}

module.exports = { productsOptions, msgOptions, usersOptions };
