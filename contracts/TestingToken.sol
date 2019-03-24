pragma solidity ^0.5;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract TestingToken is ERC20 {

    string public name = "Testing Token";
    string public symbol = "TTKN";
    uint8 public decimals = 9;
    uint public INITIAL_SUPPLY = 10000000000000;

    constructor() public {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

}
