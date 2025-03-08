// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract FileStorage {
    struct File {
        bytes32 emailHash; 
        string ipfsHash; 
        uint256 timestamp; 
    }

    mapping(address => File[]) private userFiles;

    event FileStored(address indexed user, bytes32 emailHash, string ipfsHash, uint256 timestamp);

    function storeFile(string memory email, string memory ipfsHash) public {
        bytes32 emailHash = keccak256(abi.encodePacked(email));
        userFiles[msg.sender].push(File(emailHash, ipfsHash, block.timestamp));
        
        emit FileStored(msg.sender, emailHash, ipfsHash, block.timestamp);
    }

    function getTotalFiles() public view returns (uint256) {
        return userFiles[msg.sender].length;
    }

    function getUserFiles() public view returns (bytes32[] memory, string[] memory, uint256[] memory) {
        uint256 fileCount = userFiles[msg.sender].length;
        bytes32[] memory emailHashes = new bytes32[](fileCount);
        string[] memory ipfsHashes = new string[](fileCount);
        uint256[] memory timestamps = new uint256[](fileCount);

        for (uint256 i = 0; i < fileCount; i++) {
            File storage file = userFiles[msg.sender][i];
            emailHashes[i] = file.emailHash;
            ipfsHashes[i] = file.ipfsHash;
            timestamps[i] = file.timestamp;
        }

        return (emailHashes, ipfsHashes, timestamps);
    }
}