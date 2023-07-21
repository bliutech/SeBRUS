// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Dataset {
    uint public imageCount = 0;

    string public name;
    string public description;

    struct Image {
        uint id;
        string value;
        string class;
        bool approved;
    }

    Image[] public images;

    event DataCreated(uint id, string value, string class, bool approved);

    event DataVerified(uint id, bool approved);

    constructor(string memory _name, string memory _description) {
        name = _name;
        description = _description;
    }

    function createData(string memory _content, string memory _class) public {
        imageCount++;
        images.push(Image(imageCount, _content, _class, false));
        emit DataCreated(imageCount, _content, _class, false);
    }

    function approveData(uint _id) public {
        images[_id].approved = !images[_id].approved;
        emit DataVerified(_id, images[_id].approved);
    }
}
