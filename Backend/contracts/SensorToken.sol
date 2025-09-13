// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SensorToken is ERC20, Ownable {
    constructor() ERC20("SensorToken", "SENS") Ownable(msg.sender) {
        // msg.sender becomes the owner
    }

    function mintReward(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
