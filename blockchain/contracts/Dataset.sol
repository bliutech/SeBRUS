// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "./DataImage.sol";

contract Dataset {
    uint imageCount = 0;

    string name;
    string description;

    DataImage[] images;

    event DataCreated(
        string value,
        string class,
        bool approved
    );

    event DataVerified(
        bool approved
    );

    constructor(string memory _name, string memory _description) {
        name = _name;
        description = _description;
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getDescription() public view returns (string memory) {
        return description;
    }

    function getImageCount() public view returns (uint) {
        return imageCount;
    }

    function getImage(uint index) public view returns (DataImage) {
        return images[index];
    }

    function createData(string memory _content, string memory _class) public {
        imageCount++;

        DataImage image = new DataImage(_content, _class);
        images.push(image);
        
        emit DataCreated(_content, _class, false);
    }
}
