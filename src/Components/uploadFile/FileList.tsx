// src/components/FileList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFilesQuery } from "../../Services/file";
import { RootState, AppDispatch } from '../../Store/store';

const FileList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data:files }=useFilesQuery();
  console.log("in data of FileList",files);


  return (
    <div>
      <h2>Uploaded Files</h2>
      {/* {loading && <p>Loading...</p>} */}
      {/* {error && <p>Error: {error}</p>} */}
      {/* <ul>
        {data.map((file: File) => (
          <li key={file._id}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">{file.filename}</a>
            {file.isPublic ? ' (Public)' : ' (Private)'}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default FileList;
