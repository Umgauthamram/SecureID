const axios = require("axios");
const FormData = require("form-data");

/**
 * @param {object} file 
 * @returns {string}
 */
const uploadToIPFS = async (file) => {
  try {
    const apiKey = process.env.FILEBASE_ACCESS_KEY;
    const secretKey = process.env.FILEBASE_SECRET_KEY;

    const formData = new FormData();
    formData.append("file", file.buffer, file.originalname);

    const response = await axios.post("https://api.filebase.io/v1/ipfs/add", formData, {
      headers: {
        ...formData.getHeaders(),
        "x-amz-access-key": apiKey,
        "x-amz-secret-key": secretKey,
      },
    });

    if (response.status === 200 && response.data.cid) {
      return `ipfs://${response.data.cid}`; 
    } else {
      throw new Error("File upload failed");
    }
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    throw new Error("IPFS upload failed");
  }
};

module.exports = { uploadToIPFS };