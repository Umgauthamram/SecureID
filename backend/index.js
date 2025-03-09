require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { uploadToIPFS } = require("./services/filebaseService");
const { storeOnBlockchain } = require("./services/blockchainService");
const User = require("./models/User");
const File = require("./models/Files");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

const upload = multer();

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { email } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "File is required" });

    const ipfsHash = await uploadToIPFS(file);
    const timestamp = new Date().toISOString();
    const txHash = await storeOnBlockchain(email, ipfsHash);
    

    const newFile = new File({ email, ipfsHash, txHash });
    await newFile.save();

    res.json({ success: true, ipfsHash, txHash });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));