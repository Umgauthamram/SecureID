router.post("/access-file", async (req, res) => {
  try {
    const { email, userSecret } = req.body;
    const file = await File.findOne({ email });

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    const blockchainSecret = await contract.getFileSecret(email, file.ipfsHash);
    const isUserSecretValid = await bcrypt.compare(userSecret, file.userSecret);
    const isBlockchainSecretValid = await bcrypt.compare(blockchainSecret, file.blockchainSecret);

    if (isUserSecretValid && isBlockchainSecretValid) {
      res.json({ success: true, file });
    } else {
      res.status(403).json({ message: "Invalid verification" });
    }
  } catch (error) {
    console.error("Error accessing file:", error);
    res.status(500).json({ message: "Error accessing file", error });
  }
});
