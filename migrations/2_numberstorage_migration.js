const NumberStorage = artifacts.require('NumberStorage');

module.exports = deployer => {
  deployer.deploy(NumberStorage);
};
