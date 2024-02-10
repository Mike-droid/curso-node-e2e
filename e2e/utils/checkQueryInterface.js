function CheckQueryInterface(queryInterface) {
  if (queryInterface.context) {
    queryInterface = queryInterface.context
  }
  return queryInterface
}

module.exports = { CheckQueryInterface }