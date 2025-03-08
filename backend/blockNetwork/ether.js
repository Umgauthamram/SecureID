require('dotenv').config()
const { ethers } = require('ethers')

const Alchemy = process.env.ALCHEMY_API_KEY;

if (!Alchemy) {
    console.error("Error: ALCHEMY_API_KEY is missing in .env file");
    process.exit(1); 
}

const network = 'matic';
const provider = new ethers.providers.AlchemyProvider(network, Alchemy);

async function getLatestBlockNumber() {
    try {
        const blockNumber = await provider.getBlockNumber();
        console.log(`Latest block number: ${blockNumber}`);
    } catch (error) {
        console.error('Error fetching block number:', error);
    }
}
getLatestBlockNumber();
