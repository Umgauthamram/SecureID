import React, { useState } from 'react';
import Button from './Button';
import { cn } from '@/lib/utils';

const FileCard = ({ file }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  const getFileIcon = (type) => {
    if (type.includes('image')) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    } else if (type.includes('video')) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 10L19.5528 7.72361C19.8343 7.58281 20 7.30339 20 7V17C20 17.3034 19.8343 17.5828 19.5528 17.7236L15 20M5 5H13C14.1046 5 15 5.89543 15 7V17C15 18.1046 14.1046 19 13 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    } else if (type.includes('pdf')) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8M14 2L20 8M14 2V8H20M8 13H16M8 17H16M8 9H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    } else {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
  };

  const handleVerifyDID = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsVerified(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleDownload = () => {
    console.log('Downloading file with CID:', file.cid);
  };

  return (
    <div className={cn(
      "neo-morphism p-4 rounded-lg transition-all duration-300 hover-lift",
      isVerified ? "bg-primary/5 border border-primary/20" : ""
    )}>
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-md bg-secondary text-foreground">
          {getFileIcon(file.type)}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-base truncate" title={file.name}>
            {file.name}
          </h3>
          <div className="flex items-center text-xs text-muted-foreground mt-1 space-x-2">
            <span>{file.size}</span>
            <span>•</span>
            <span>{file.type.split('/')[1].toUpperCase()}</span>
            <span>•</span>
            <span>{file.dateUploaded}</span>
          </div>
          
          {isVerified && (
            <div className="mt-3 p-2 bg-white rounded border text-xs overflow-hidden">
              <div className="font-medium mb-1">IPFS CID:</div>
              <div className="font-mono truncate">{file.cid || 'QmZ4tDuvesekSs4qM5ZBKpXiZGun7S2CYtEZRB3DYXkjGx'}</div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex space-x-2">
        {!isVerified ? (
          <Button 
            onClick={handleVerifyDID} 
            fullWidth 
            size="sm"
            isLoading={isLoading}
          >
            Verify DID
          </Button>
        ) : (
          <Button 
            onClick={handleDownload} 
            fullWidth
            size="sm"
            variant="outline"
            leftIcon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 16L4 17C4 18.6569 5.34315 20 7 20L17 20C18.6569 20 20 18.6569 20 17L20 16M16 12L12 16M12 16L8 12M12 16L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
          >
            Download
          </Button>
        )}
      </div>
    </div>
  );
};

export default FileCard;
