import React, { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const FileExplorer = ({ folderId, folderName }) => {
  const [subFolders, setSubFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [files, setFiles] = useState([]);

  // Ambil subfolder ketika folderId berubah
  useEffect(() => {
    setFiles([]) 
    if (folderId) {
      fetch(`http://localhost:8001/api/v1/sub_folders/${folderId}`)
        .then((response) => response.json())
        .then((data) => setSubFolders(data))
        .catch((err) => console.error('Error fetching subfolders:', err));
    }
  }, [folderId]);

  // Ambil file dalam subfolder yang dipilih
  useEffect(() => {
    setFiles([]) 
    if (selectedFolderId) {
      // Reset file saat folder dipilih
      setFiles([]); // Mengosongkan file sebelumnya

      fetch(`http://localhost:8001/api/v1/files/${selectedFolderId}`)
        .then((response) => response.json())
        .then((data) => {
          setFiles(data); // Set file baru berdasarkan subfolder
        })
        .catch((err) => console.error('Error fetching files:', err));
    }
  }, [selectedFolderId]); // Hanya ketika selectedFolderId berubah

  // Handler untuk klik pada subfolder
  const handleSubfolderClick = (subfolderId) => {
    setFiles([]) 
    setSelectedFolderId(subfolderId); // Set folder yang dipilih
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
                <li
                  key={folder.id}
                  onClick={() => handleSubfolderClick(folder.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {folder.name}
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>Select a folder to see its subfolders</p>
      )}
    </div>
  );
};

export default FileExplorer;
