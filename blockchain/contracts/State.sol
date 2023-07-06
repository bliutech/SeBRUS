// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract State {
  uint public nodeCount = 0;

  struct Node {
    uint id;
    string value;
    bool visited;
  }

  mapping(uint => Node) public nodes;

  event NodeCreated(
    uint id,
    string value,
    bool visited
  );

  event NodeVisited(
    uint id,
    bool visited
  );

  constructor() {
    createNode("Node 1");
  }

  function createNode(string memory _content) public {
    nodeCount ++;
    nodes[nodeCount] = Node(nodeCount, _content, false);
    emit NodeCreated(nodeCount, _content, false);
  }

  function vistNode(uint _id) public {
    Node memory _node = nodes[_id];
    _node.visited = !_node.visited;
    nodes[_id] = _node;
    emit NodeVisited(_id, _node.visited);
  }
}