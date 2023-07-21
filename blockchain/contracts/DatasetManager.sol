// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Dataset.sol";

contract DatasetManager {
    uint public datasetCount = 0;
    Dataset[] public datasets;

    event DatasetCreated(string name, string description);

    function createDataset(string memory name, string memory description) public {
        datasetCount++;

        Dataset dataset = new Dataset(name, description);
        datasets.push(dataset);
        
        emit DatasetCreated(name, description);
    }
}
