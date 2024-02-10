const { CheckQueryInterface } = require('../../../e2e/utils/checkQueryInterface');
const { PRODUCT_TABLE } = require('../models/product.model');

module.exports = {
  up: async (queryInterface) => {
    queryInterface = CheckQueryInterface(queryInterface);
    return queryInterface.bulkInsert(PRODUCT_TABLE, [
      {
        name: 'Product 1',
        image: 'https://api.lorem.space/image/game?w=150&h=220',
        description: 'A description',
        price: 10,
        category_id: 1,
        created_at: new Date(),
      },
      {
        name: 'Product 2',
        image: 'https://api.lorem.space/image/game?w=150&h=220',
        description: 'A new description',
        price: 99,
        category_id: 2,
        created_at: new Date(),
      },
      {
        name: 'Product 3',
        image: 'https://api.lorem.space/image/game?w=150&h=220',
        description: 'Another description',
        price: 788,
        category_id: 2,
        created_at: new Date(),
      },
      {
        name: 'Product 4',
        image: 'https://api.lorem.space/image/game?w=150&h=220',
        description: 'Yet another description',
        price: 500,
        category_id: 1,
        created_at: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    queryInterface = CheckQueryInterface(queryInterface);
    return queryInterface.bulkDelete(PRODUCT_TABLE, null, {});
  },
};
