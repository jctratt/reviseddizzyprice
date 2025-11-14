import React from 'react';

interface GeminiInfoModalProps {
  itemName: string | null;
  onClose: () => void;
}

// AI functionality has been removed.
const GeminiInfoModal: React.FC<GeminiInfoModalProps> = ({ itemName, onClose }) => {
  if (!itemName) {
    return null;
  }
  
  // This component is no longer rendered by the main app.
  return null;
};

export default GeminiInfoModal;