const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  ipfsHash: { type: String, required: true, unique: true }, 
  fileName: { type: String, required: true },
  fileType: { type: String, required: true }, 
  fileSize: { type: Number, required: true }, 
  uploadTime: { type: Date, default: Date.now }, 
  blockchainTx: { type: String, required: true, unique: true }, 
  storedPasswordHash: { type: String, required: true }
});

// Export File Model
module.exports = mongoose.model("File", FileSchema);
