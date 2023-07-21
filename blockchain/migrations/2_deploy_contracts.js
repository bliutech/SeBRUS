let DatasetManager = artifacts.require("./DatasetManager.sol");

module.exports = function(deployer) {
  deployer.deploy(DatasetManager);
};