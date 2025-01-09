import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import * as Icon from "react-bootstrap-icons";
import { truncateFileName } from "../../../Utility";
// import { baseUrl } from "../../../redux";

const UploadMultiFiles = ({
  className = "",
  value,
  multiple = true,
  inTableInput = false,
  ...props
}) => {
  const [files, setFiles] = useState([...value]);

  useEffect(() => {
    setFiles([...value]);
  }, [value]);

  const handleDelete = (index) => {
    let updatedFiles = [...value];
    updatedFiles.splice(index, 1);
    props.onChange({
      target: { name: props.name, isDeleted: true, updatedFiles },
    });
  };

  return (
    <>
      {inTableInput ? (
        <>
          <div className="d-flex flex-column align-items-center">
            <input
              {...props}
              className={`visually-hidden ${className}`}
              id={props?.id ? props?.id : "files"}
              type="file"
              multiple={multiple}
            />
            <label
              for={props?.id ? props?.id : "files"}
              className="upload-button"
            >
              <Icon.BoxArrowUp size={20} color="black" /> Upload
            </label>
          </div>
          <div className="d-flex flex-wrap gap-1">
            {files.length === 0 && props?.placeholder}
            {files &&
              files.map((file, index) => {
                let fileName = file?.url?.substring(
                  file?.url?.lastIndexOf("/") + 1
                );
                return (
                  <div key={index} className="d-flex align-items-center">
                    <div className="badge bg-secondary mr-1">
                      {fileName
                        ? truncateFileName(fileName[index])
                        : truncateFileName(file.name[index])}
                    </div>
                    <Icon.Trash
                      onClick={() => handleDelete(index)}
                      size="14"
                      className="action-icons"
                    />
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <div className="bg-light px-3 rounded d-flex align-items-center justify-content-between">
          <input
            {...props}
            className={`visually-hidden ${className}`}
            id={props?.id ? props?.id : "files"}
            type="file"
            multiple={multiple}
          />
          <div className="col-md-9 d-flex flex-wrap gap-1">
            {files.length === 0 && props?.placeholder}
            {files &&
              files.map((file, index) => {
              
                let fileName = file?.url?.substring(
                  file?.url?.lastIndexOf("/") + 1
                );
               
                return (
                  <div key={index} className="d-flex align-items-center">
                    <div className="badge bg-secondary mr-1">
                      {fileName
                        ? truncateFileName(fileName)
                        : truncateFileName(file.name)}
                    </div>
                    <Icon.Trash
                      onClick={() => handleDelete(index)}
                      size="14"
                      className="action-icons"
                    />
                  </div>
                );
              })}
          </div>

          <label
            for={props?.id ? props?.id : "files"}
            className="upload-button"
          >
            <Icon.BoxArrowUp size={20} color="black" /> Upload
          </label>
        </div>
      )}
    </>
  );
};

export default UploadMultiFiles;
