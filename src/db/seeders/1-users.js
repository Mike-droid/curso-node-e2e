const bcrypt = require('bcrypt');
const { USER_TABLE } = require('../models/user.model');
const { CheckQueryInterface } = require('../../../e2e/utils/checkQueryInterface');

module.exports = {
  up: async (queryInterface) => {
    queryInterface = CheckQueryInterface(queryInterface);
    const adminPassword = 'admin123';
    const passwordCustomer = 'customer123';
    return queryInterface.bulkInsert(USER_TABLE, [
      {
        email: 'admin@mail.com',
        password: await bcrypt.hash(adminPassword, 10),
        role: 'admin',
        created_at: new Date(),
      },
      {
        email: 'customer@mail.com',
        password: await bcrypt.hash(passwordCustomer, 10),
        role: 'customer',
        created_at: new Date(),
      }
  ]);
  },
  down: (queryInterface) => {
    queryInterface = CheckQueryInterface(queryInterface);
    return queryInterface.bulkDelete(USER_TABLE, null, {});
  }
};
