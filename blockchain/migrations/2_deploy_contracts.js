var TodoList = artifacts.require("./State.sol");

module.exports = function(deployer) {
  deployer.deploy(TodoList);
};