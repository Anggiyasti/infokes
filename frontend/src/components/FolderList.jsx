/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

const FolderList = ({ onSelectFolder }) => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8001/api/v1/folders`)
      .then((response) => response.json())
      .then((data) => setFolders(data))
      .catch((err) => console.error('Error fetching folders:', err));
  }, []);

  return (
    <div>
      <h3>Folder Structure</h3>
      <ul>
        {folders.map((folder) => (
          <li
            key={folder.id}
            onClick={() => onSelectFolder(folder.id, folder.name)}
            style={{ cursor: 'pointer' }}
          >
            {folder.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FolderList;
