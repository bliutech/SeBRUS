let DatasetManager = artifacts.require("./DatasetManager.sol");
let Dataset = artifacts.require("./Dataset.sol");

module.exports = function(deployer) {
  deployer.deploy(DatasetManager);
  deployer.deploy(Dataset);
};