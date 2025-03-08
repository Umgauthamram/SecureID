

import React, { useState, useRef, useEffect } from 'react';
import Button from '../components/Button';
import FileCard from '../components/FileCard';
import { ethers } from 'ethers';
import FileStorage from "../../../backend/blockchain/abi/contractABI.json";
import axios from 'axios';
import config from '../config'; 

const ipfsGateway = 'https://ipfs.io/ipfs/';

const Dashboard = () => {
    const [files, setFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef(null);
    const [userEmail, setUserEmail] = useState('');
    const [totalFiles, setTotalFiles] = useState(0);
    const [ipfsHashes, setIpfsHashes] = useState([]);

    const RPC_URL = config.RPC_URL;
    const CONTRACT_ADDRESS = config.CONTRACT_ADDRESS;
    const CHAIN_ID = config.CHAIN_ID;

    useEffect(() => {
        const fetchBlockchainData = async () => {
            try {
                const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
                const contract = new ethers.Contract(CONTRACT_ADDRESS, FileStorage.abi, provider);

                const total = await contract.getTotalFiles();
                setTotalFiles(total.toNumber());

                const [emails, hashes, timestamps] = await contract.getUserFiles();
                setIpfsHashes(hashes);

                const fileData = emails.map((email, index) => ({
                    id: index.toString(),
                    name: File `${index + 1}`,
                    type: 'unknown',
                    size: 'unknown',
                    dateUploaded: new Date(timestamps[index].toNumber() * 1000).toLocaleDateString()
                }));
                setFiles(fileData);
            } catch (error) {
                console.error("Error fetching blockchain data:", error);
            }
        };

        fetchBlockchainData();
    }, []);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            await handleFileUpload(file);
        }
    };

    const handleFileUpload = async (file) => {
        setIsUploading(true);
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    setUploadProgress(0);
                    return 100;
                }
                return prev + 5;
            });
        }, 200);

        try {
            const ipfsHash = await uploadToIPFS(file);

            await storeFileOnBlockchain(userEmail, ipfsHash);

            const newFile = {
                id: `${Date.now()}`,
                name: file.name,
                type: file.type || 'application/octet-stream',
                size: formatFileSize(file.size),
                dateUploaded: new Date().toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })
            };
            setFiles(prev => [newFile, ...prev]);
            setTotalFiles(prev => prev + 1);
        } catch (error) {
            console.error("File upload error:", error);
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const uploadToIPFS = async (file) => {
        try {
            
            return "QmSomeIPFSHash";
        } catch (error) {
            console.error("Error uploading to IPFS:", error);
            throw error;
        }
    };

    const storeFileOnBlockchain = async (email, ipfsHash) => {
        try {
            const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(CONTRACT_ADDRESS, FileStorage.abi, signer);

            const tx = await contract.storeFile(email, ipfsHash);
            await tx.wait();

            console.log("File stored on blockchain!");
        } catch (error) {
            console.error("Error storing file on blockchain:", error);
        }
    };

    return (
        <div className="page-content">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">My Files</h1>
                    <p className="text-muted-foreground mt-1">
                        Securely stored on IPFS and verified with your DID
                    </p>
                </div>

                <div className="flex">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <Button
                        onClick={handleUploadClick}
                        disabled={isUploading}
                        leftIcon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 12L12 8M12 8L8 12M12 8V20M20 16.7428C21.2215 15.734 22 14.2079 22 12.5C22 9.46243 19.5376 7 16.5 7C16.2815 7 16.0771 6.886 15.9661 6.69774C14.6621 4.48484 12.2544 3 9.5 3C5.35786 3 2 6.35786 2 10.5C2 12.5661 2.83545 14.4371 4.18695 15.7935" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        }
                    >
                        Upload File
                    </Button>
                </div>
            </div>

            {isUploading && (
                <div className="mb-8 animate-fade-in">
                    <div className="glass-morphism p-4 rounded-lg">
                        <div className="flex justify-between text-sm mb-1">
                            <span>Uploading to IPFS and Blockchain...</span>
                            <span>{uploadProgress}%</span>
                        </div>
                        <div className="bg-secondary rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-primary h-full transition-all duration-300 ease-out"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            Your file is being uploaded to IPFS and linked to your DID-NFT
                        </p>
                    </div>
                </div>
            )}
            <div className='ml-3 '>
                <p className='mb-2'>Total Files: {totalFiles}</p>
                <p>IPFS Hashes: {ipfsHashes.join(", ")}</p>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
                {files.map((file) => (
                    <FileCard key={file.id} file={file} />
                ))}
            </div>

            {files.length === 0 && !isUploading && (
                <div className="neo-morphism p-8 rounded-lg text-center">
                    <div className="text-5xl mb-4">📁</div>
                    <h3 className="text-xl font-medium mb-2">No files yet</h3>
                    <p className="text-muted-foreground mb-4">
                        Upload your first file to get started
                    </p>
                    <Button
                        onClick={handleUploadClick}
                        variant="outline"
                    >
                        Upload a File
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;