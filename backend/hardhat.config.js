require('dotenv').config();
const { ALCHEMY_API_KEY, PRIVATE_KEY } = process.env;

module.exports = {
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  solidity: "0.8.28",
};