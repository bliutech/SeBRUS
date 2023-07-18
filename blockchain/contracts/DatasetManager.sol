// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Dataset.sol";

contract DatasetManager {
    Dataset[] public datasets;

    event DatasetCreated(string name, string description);

    function create(string memory name, string memory description) public {
        Dataset dataset = new Dataset(name, description);
        datasets.push(dataset);
        emit DatasetCreated(name, description);
    }
}
