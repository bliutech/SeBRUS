let DatasetManager = artifacts.require("./DatasetManager.sol");
let Dataset = artifacts.require("./Dataset.sol");

module.exports = function(deployer) {
  deployer.deploy(DatasetManager);
  deployer.deploy(Dataset, "CIFAR10", "The CIFAR-10 dataset consists of 60000 32x32 colour images in 10 classes, with 6000 images per class. There are 50000 training images and 10000 test images. The dataset is divided into five training batches and one test batch, each with 10000 images.");
};