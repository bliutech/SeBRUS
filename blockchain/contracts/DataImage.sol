// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract DataImage {
    string value;
    string class;
    bool approved;

    event DataVerified(
        bool approved
    );

    constructor(string memory _value, string memory _class) {
        value = _value;
        class = _class;
        approved = false;
    }

    function getValue() public view returns (string memory) {
        return value;
    }

    function getClass() public view returns (string memory) {
        return class;
    }

    function getApproved() public view returns (bool) {
        return approved;
    }

    function approve() public {
        approved = true;
        emit DataVerified(approved);
    }
}