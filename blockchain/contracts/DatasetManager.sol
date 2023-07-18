// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Dataset.sol";

contract DatasetManager {
    Dataset[] public datasets;

    event DatasetCreated(string name, string description);

    constructor() {
        create("MNIST", "The MNIST database (Modified National Institute of Standards and Technology database) is a large database of handwritten digits that is commonly used for training various image processing systems.");
    }

    function create(string memory name, string memory description) public {
        Dataset dataset = new Dataset(name, description);
        datasets.push(dataset);
        emit DatasetCreated(name, description);
    }
}
