import React, { useState } from 'react';
import FolderList from './components/FolderList';
import FileExplorer from './components/FileExplorer';
import './App.css';

const App = () => {
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [selectedFolderName, setSelectedFolderName] = useState('');

  const handleSelectFolder = (folderId, folderName) => {
    setSelectedFolderId(folderId);
    setSelectedFolderName(folderName);
  };

  return (
    <div className="explorer-container">
      <div className="folder-panel">
        <FolderList onSelectFolder={handleSelectFolder} />
      </div>
      <div className="file-panel">
        <FileExplorer folderId={selectedFolderId} folderName={selectedFolderName} />
      </div>
    </div>
  );
};

export default App;
