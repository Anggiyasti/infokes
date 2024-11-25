import React, { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const FileExplorer = ({ folderId, folderName }) => {
  const [subFolders, setSubFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [files, setFiles] = useState([]);

  // Ambil subfolder ketika folderId berubah
  useEffect(() => {
    if (folderId) {
      fetch(`http://localhost:8001/api/v1/sub_folders/${folderId}`)
        .then((response) => response.json())
        .then((data) => setSubFolders(data))
        .catch((err) => console.error('Error fetching subfolders:', err));
    }
  }, [folderId]);

  // Ambil file dalam subfolder yang dipilih
  useEffect(() => {
    if (selectedFolderId) {
      fetch(`http://localhost:8001/api/v1/files/${selectedFolderId}`)
        .then((response) => response.json())
        .then((data) => setFiles(data))
        .catch((err) => console.error('Error fetching files:', err));
    }
  }, [selectedFolderId]);

  // Handler untuk klik pada subfolder
  const handleSubfolderClick = (subfolderId) => {
    setSelectedFolderId(subfolderId);
    setFiles([]); // Reset files before fetching
  };

  return (
    <div>
      {folderId ? (
        <>
          <h3>Subfolders in {folderName}</h3>
          {subFolders.length === 0 ? (
            <p>This folder is empty</p>
          ) : (
            <ul>
              {subFolders.map((folder) => (
                <li key={folder.id} onClick={() => handleSubfolderClick(folder.id)}>
                  {folder.name}
                </li>
              ))}
            </ul>
          )}

          {selectedFolderId && (
            <>
              <h4>Files in {subFolders.find((folder) => folder.id === selectedFolderId)?.name}</h4>
              {files.length > 0 && (
                <ul>
                  {files.map((file) => (
                    <li key={file.id}>{file.name}</li>
                  ))}
                </ul>
              )}
            </>
          )}
        </>
      ) : (
        <p>Select a folder to see its subfolders</p>
      )}
    </div>
  );
};

export default FileExplorer;
