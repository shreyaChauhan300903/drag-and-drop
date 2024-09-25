import { useState, useRef } from "react";

const DragDropFiles = () => {
  const [files, setFiles] = useState(null);
  const [previews, setPreviews] = useState([]); 
  const [uploadedImages, setUploadedImages] = useState([]); 
  const inputRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    setFiles(droppedFiles);
    generatePreviews(droppedFiles); 
  };

  const handleFileInput = (event) => {
    const selectedFiles = event.target.files;
    setFiles(selectedFiles);
    if (selectedFiles) {
      generatePreviews(selectedFiles); 
    }
  };

  
  const generatePreviews = (files) => {
    const previewUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviews(previewUrls);
  };

  const handleUpload = () => {
    if (files) {
      const uploaded = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setUploadedImages(uploaded); 

      
      setFiles(null);
      setPreviews([]);
    }
  };

  return (
    <div>
      {files ? (
        <div className="uploads">
          <ul>
            {Array.from(files).map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
          <div className="previews">
            {previews.map((src, idx) => (
              <img key={idx} src={src} alt="Preview" width="100" />
            ))}
          </div>
          <div className="actions">
            <button onClick={() => setFiles(null)}>Cancel</button>
            <button onClick={handleUpload}>Upload</button>
          </div>
        </div>
      ) : (
        <div
          className="dropzone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <h1>Drag and Drop Files to Upload</h1>
          <h1>Or</h1>
          <input
            type="file"
            multiple
            onChange={handleFileInput}
            hidden
            accept="image/png, image/jpeg"
            ref={inputRef}
          />
          <button onClick={() => inputRef.current?.click()}>
            Select Files
          </button>
        </div>
      )}

      <div className="uploaded-images">
        {uploadedImages.map((src, idx) => (
          <img key={idx} src={src} alt="Uploaded" width="100" />
        ))}
      </div>
    </div>
  );
};

export default DragDropFiles;
