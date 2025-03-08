const { ethers, keccak256, toUtf8Bytes } = require("ethers");
require("dotenv").config(); 
const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
const privateKey = process.env.PRIVATE_KEY?.trim();
if (!privateKey || privateKey.length !== 64) {
  throw new Error("Invalid private key");
}
const wallet = new ethers.Wallet(privateKey, provider);
const fileStorageABI = require('../blockchain/abi/contractABI.json');
const contractABI = fileStorageABI.abi; 
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

/**
 * Store file details on blockchain
 * @param {string} email - User's email
 * @param {string} ipfsHash - IPFS hash of the file
 * @returns {string} Transaction hash
 */
const storeOnBlockchain = async (email, ipfsHash) => {
  try {
    const emailHash = keccak256(toUtf8Bytes(email)); 
    const tx = await contract.storeFile(emailHash, ipfsHash);
    await tx.wait();
    return tx.hash;
  } catch (error) {
    console.error("Error storing file on blockchain:", error);
    throw new Error("Blockchain transaction failed");
  }
};

module.exports = { storeOnBlockchain };