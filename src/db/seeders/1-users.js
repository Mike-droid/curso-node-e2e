const bcrypt = require('bcrypt');
const { USER_TABLE } = require('../models/user.model');
const { CheckQueryInterface } = require('../../../e2e/utils/checkQueryInterface');

module.exports = {
  up: async (queryInterface) => {
    queryInterface = CheckQueryInterface(queryInterface);
    const password = 'admin123';
    const hash = await bcrypt.hash(password, 10);
    return queryInterface.bulkInsert(USER_TABLE, [{
      email: 'admin@mail.com',
      password: hash,
      role: 'admin',
      created_at: new Date(),
    }]);
  },
  down: (queryInterface) => {
    queryInterface = CheckQueryInterface(queryInterface);
    return queryInterface.bulkDelete(USER_TABLE, null, {});
  }
};
