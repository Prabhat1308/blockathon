// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title NFT minting contract for each file stored by the user on ipfs
 * @author Team Dapp Dragons
 * @notice This contracts mints an NFT when a user stores a file on IPFS using our platform
 * @dev each file stored corresponds to an NFT that represnts the ownership of that file by the user
 */

contract DataProofNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct File {
        string fileName;
        string fileHash;
        string fileType;
        string fileDescription;
        string fileUri;
    }

    struct User {
        string name;
        address userAddress;
        File[] data;
        // array of tokenUri for each file uploaded
    }

    User[] users;
    mapping(address => uint256) addressToIndex;
    mapping(address => mapping(string => uint256)) userTofileHashToIndex;

    event NFTminted(uint indexed tokenID, address indexed owner);

    constructor() ERC721("FilStore", "FST") {}

    /**
     * @notice this functions adds a new user in the users array which keeps track of all users
     * It checks whether the userAddress already exists or not
     * It then adds the user with the given param and msg.sender
     * It also sets a mapping to get index of the user from an address as a key
     * @param name name of the user
     */

    function addUser(string name) public {
        for (uint i = 0; i < users.length(); i++) {
            require(msg.sender != users[i].userAddress, "User already exists!");
        }
        User _newUser;
        _newUser.name = name;
        _newUser.userAddress = msg.sender;
        addressToIndex[msg.sender] = users.length();
        users.push(_newUser);
    }

    /**
     * @notice this function mints an NFT whenever a new file is added
     * @param file file struct which contains all the details about the file including the fileHash
     * and file URI which is the address of the encrypted file on IPFS
     * @dev
     * It checks wheter the user has already minted an NFT for the given file or not
     * It mints an NFT for the given file and sets the URI to IPFS address
     * It adds the new file in the data array of the give user
     * It sets a mapping for file index with address and fileHash as its keys
     * It emits an event logging that NFT has been minted along with fileId and userAddress
     */

    function addFile(File file) public {
        uint256 _newFileId = _tokenIds.current();
        uint256 userId = addressToIndex[msg.sender];

        for (uint i = 0; i < users[userId].data.length(); i++) {
            require(
                users[userId].data[i].fileHash != file.fileHash,
                "File already exists!"
            );
        }

        _mint(msg.sender, _newFileId);
        _setTokenURI(_newFileId, file.fileUri);
        _tokenIds.increment();

        userTofileHashToIndex[msg.sender][file.fileHash] = users[userId]
            .data
            .length();
        users[userId].data.push(file);

        emit NFTminted(_newFileId, msg.sender);
    }
}
