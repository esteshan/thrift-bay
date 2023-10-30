import React, { useState, useEffect, useRef } from "react";


const Fileinput = ({ onChange, reset, showSuccessMessage, isRequired }) => {
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (reset && fileInputRef.current) {
      setFileName("");
      fileInputRef.current.value = "";
    }
  }, [reset]);

  const handleFileChange = (event) => {
    onChange(event);
    setFileName(
      event.target.files.length > 0 ? event.target.files[0].name : ""
    );
  };

  return (
    <div className="custom-file-input-signup-container">
      <div className="input-wrapper">
        <input
          type="file"
          id="new_image"
          name="new_image"
          className="hidden-file-input"
          onChange={handleFileChange}
          ref={fileInputRef}
          accept="image/*,video/*"
          required={isRequired}
        />
        <label htmlFor="new_image" className="custom-file-label">
        </label>
      </div>
      {showSuccessMessage && fileName && (
        <div className="file-upload-success">Uploaded: {fileName}</div>
      )}
    </div>
  );
};

export default Fileinput;
