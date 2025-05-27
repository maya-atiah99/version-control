import React, { useState } from "react";
import styles from "./UploadFile.module.scss";
import Button from "component/atom/forms/button/Button";
import SvgWithBranding from "component/hoc/branding/withBrandingColor.hoc";

const MultipleFileUpload = ({
  title,
  bodyHeaders,
  footer,
  setSelectedFiles,
  singleFile,
}) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const isValidFileType = (file) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "text/plain",
    ];
    return allowedTypes.includes(file.type);
  };
  const handleFileSelect = (event) => {
    const newFiles = Array.from(event.target.files).filter(isValidFileType);

    if (singleFile) {
      const updatedFiles = newFiles.length > 0 ? [newFiles[0]] : [];
      setFiles(updatedFiles);
      setSelectedFiles(updatedFiles);
    } else {
      const updatedFiles = [
        ...files,
        ...newFiles.filter((file) => !files.some((f) => f.name === file.name)),
      ];
      setFiles(updatedFiles);
      setSelectedFiles(updatedFiles);
    }
  };

  const handleRemoveFile = (fileName) => {
    const updatedFiles = files.filter((file) => file.name !== fileName);
    setFiles(updatedFiles);
    setSelectedFiles(updatedFiles);
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const newFiles = Array.from(event.dataTransfer.files).filter(
      (file) =>
        isValidFileType(file) && !files.some((f) => f.name === file.name)
    );
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    setSelectedFiles(updatedFiles);
  };

  const formatFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className={styles["upload-container"]}>
      <h2 className={styles["upload-title"]}>{title}</h2>
      <div className={styles["upload-body"]}>
        <div>{bodyHeaders}</div>
        <div
          className={`${styles["drag-drop-container"]} ${
            isDragging ? styles["dragging"] : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div
            className={styles["upload-image-container"]}
            onClick={handleButtonClick}
          >
            <SvgWithBranding type="upload_file" />
            <span>Drag and Drop or Upload</span>
          </div>
          <Button
            buttonType="button"
            label="Upload"
            onClick={handleButtonClick}
            className={styles["button"]}
          />
          <input
            id="fileInput"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
        </div>

        <div>{footer}</div>
        <div>
          {files.length > 0 && (
            <div className={styles["file-list"]}>
              {files.map((file, index) => (
                <div key={index}>
                  <div className={styles["file-item"]}>
                    <div className={styles["file-name-container"]}>
                      <img src="/images/file-icon.svg" alt="File Icon" />
                      <span className={styles["file-name"]}>{file.name}</span>
                      <span className={styles["file-size"]}>
                        ({formatFileSize(file.size)})
                      </span>
                    </div>
                    <img
                      className={styles["close-icon"]}
                      src="/images/close-grey.svg"
                      alt="Remove"
                      onClick={() => handleRemoveFile(file.name)}
                    />
                  </div>
                  {index < files.length - 1 && (
                    <div className={styles["separator"]}></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultipleFileUpload;
