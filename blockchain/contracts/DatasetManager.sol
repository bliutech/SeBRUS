// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./Dataset.sol";

contract DatasetManager {
    uint datasetCount = 0;

    Dataset[] datasets;

    event DatasetCreated(
        string name,
        string description
    );

    function getDatasetCount() public view returns (uint) {
        return datasetCount;
    }

    function getDataset(uint index) public view returns (Dataset) {
        return datasets[index];
    }

    function createDataset(string memory name, string memory description) public {
        datasetCount++;

        Dataset dataset = new Dataset(name, description);
        datasets.push(dataset);
        
        emit DatasetCreated(name, description);
    }
}
