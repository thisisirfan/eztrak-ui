import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import * as Icon from "react-bootstrap-icons";
import { baseUrl } from "../../../redux";

const UploadImages = ({
  className = "",
  value,
  accept = "image/*",
  multiple = true,
  ...props
}) => {
  const [images, setImages] = useState([...value]);

  useEffect(() => {
    setImages([...value]);
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
      <input
        {...props}
        className={className}
        type="file"
        accept={accept}
        multiple={multiple}
      />
      <span className="d-flex flex-wrap mt-2">
        {images &&
          images.map((img, index) => (
            <div key={index} className="mr-2">
              {img?.url && (
                <img
                  style={{ height: "80px", width: "80px", objectFit: "cover" }}
                  src={baseUrl + img?.url}
                  alt="image"
                />
              )}
              <div className="badge badge-light mr-1">{img.name}</div>
              <Icon.Trash
                onClick={() => handleDelete(index)}
                size="16"
                className="action-icons"
              />
            </div>
          ))}
      </span>
    </>
  );
};

export default UploadImages;
