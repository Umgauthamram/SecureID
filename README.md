**SecureID**-Decentralized Digital Identity & Storage
-

**Problem Statement**
In today's internet, users rely on centralized platforms like Google, Facebook, and cloud services to store their identities and data. This creates three major problems:

1. Lack of ownership – Users don’t own their identities or data,companies controls them. Eg:Accounts can be deleted, modified, or even hacked.

2. Security & Privacy – Passwords, personal details, and sensitive data are stored on centralized servers, making them prime targets for hacking.

3. Data Censorship & Dependence – Files stored on cloud providers (Google Drive, Dropbox) can be blocked, deleted, or restricted based on policies.
***

**Our Solution**
We propose a system that gives users full control over their identity and data using:
1. DID-NFT (Decentralized Identity) – A blockchain-based identity that only the user owns.
2. IPFS (InterPlanetary File System) – A censorship-resistant, decentralized storage solution.
3. zk-SNARKs (Zero-Knowledge Proofs) – A private and secure way to authenticate without revealing any sensitive data.

***

**Key Features**
1. Multi-Factor Authentication – Secure registration & login via MetaMask, passphrase, phone/email verification.
2. Decentralized Storage – Filebase + IPFS for storing files securely with a Polygon blockchain record.
3. Two-Password Verification – One password given to the user, the second stored on-chain for secure file access and files are only accessible if both passwords match.
4. File Details View – Users can see file name, type, size, timestamp before accessing.
5. Preview & Download Options – Once verified, users can preview or download the file.
6. Zero-Knowledge Proofs (ZKP) – Enables authentication without revealing sensitive data.
***

**Project Overview**
SecureID is a decentralized digital identity (DID) and authentication system that ensures secure file storage and access using blockchain (Polygon), IPFS, and cryptographic verification. It leverages zero-knowledge proofs (ZKP) to provide private and secure authentication, allowing users to own and control their identity. SecureID offers decentralized storage for sensitive data while ensuring privacy, security, and trustless verification.

1.Decentralized Authentication – Users register with email, phone number, password, passcode, passphrase, and MetaMask.
2.Flexible Login – Users can log in using phone number or email, with MetaMask and passphrase verification.
3.Decentralized File Storage – Files are uploaded and stored in IPFS via Filebase, with the hash stored on the Polygon blockchain.
4.Access Verification System – Dual-password authentication ensures file security. One password is given to the user, while the other is stored securely on-chain.
5.File Details – Users can view file name, date, time, size, and type before accessing.
6.Secure File Access – Users can preview and download files only if the two passwords match.
***

**Security & Privacy**
1. User Ownership – Users own their identity via MetaMask & NFT-based authentication.
2. End-to-End Encryption – Files stored on IPFS are encrypted for privacy.
3. Two-Password Verification – Prevents unauthorized access.
4. Blockchain Immutability – Ensures files cannot be tampered with.

***

**Tech Stack**
1.Block to store files details - Polygon (Ethereum Layer 2)
2.smart contract- Solidity
3.File storage - IPFS (via Filebase)
4.Authentication-MetaMask, Passphrase, JWT, Two-Password Verification
5.MERN stack- 
    Frontend: React.js, Web3.js, Tailwind CSS
    Backend:  Node.js, Express.js, MongoDB


**Summary of the project**
This project addresses real-life problems related to the security and ownership of user files and documents by leveraging decentralized technologies. Users gain complete control over their digital identity and data, removing the reliance on centralized accounts and passwords, which are often vulnerable to breaches. By using blockchain-based solutions like Decentralized Identifiers (DIDs) and Zero-Knowledge Proofs (ZKPs), the system ensures privacy, authenticity, and integrity of user data while minimizing the risk of unauthorized access. This empowers users to securely manage, access, and share their documents without relying on third-party intermediaries.

**License**
This project is licensed under the MIT License 