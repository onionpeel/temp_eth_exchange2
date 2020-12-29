pragma solidity ^0.8.0;

contract NumberStorage {
  uint public savedNumber;

  event CurrentValue(
    uint indexed currentNumber,
    address indexed sender
  );

  constructor() public {
    savedNumber = 10;
  }

  function changeNumber(uint _number) public {
    savedNumber = _number;
    emit CurrentValue(savedNumber, msg.sender);
  }
}
