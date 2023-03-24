// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
contract Demo is ERC721URIStorage  {
 using Counters for Counters.Counter;
 Counters.Counter private _tokenIds;

 event NFTminted(uint indexed tokenID,address indexed owner); 

  constructor() ERC721("GameItem", "ITM") {}

// proof of data handling nft
 function mintNFT (string memory _tokenURI) public {

    uint256 _newItemId = _tokenIds.current();

    _mint(msg.sender,_newItemId);
    _setTokenURI(_newItemId, _tokenURI);
     _tokenIds.increment();
    emit NFTminted(_newItemId,msg.sender);

 }
 



}