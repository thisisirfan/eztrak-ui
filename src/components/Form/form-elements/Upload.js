import React, { useEffect } from "react";
import "./Upload.scss";
import { BoxArrowUp } from "react-bootstrap-icons";
import { truncateFileName } from "../../../Utility";
import { useDispatch, useSelector } from "react-redux";
import { createRecord } from "../../../redux/reducers";

const Upload = ({ className = "", value = "", ...props }) => {

  const ref = React.useRef(null);
  const uploads = useSelector((state) => state.form.uploads);
  useEffect(() => {
    if (uploads[props?.name]) {
      props.onChange({ target: { name: props?.name, value: uploads[props?.name].data.filePath } })
      if (ref && props?.inTableInput) {
          ref.current.value = null;
      }
    }

    return () => {

    }
  }, [uploads])


  const dispatch = useDispatch();
  const getValue = () => {
    return value && value.replace(/^.*[\\\/]/, "");
  };

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    dispatch({
      type: createRecord.type,
      payload: {
        file: { name: "file", value: selectedFile },
        url: props?.url ? props?.url : "/FileUpload/register/user/file",
        headers: { "Content-Type": "multipart/form-data" },
        supressMessages: true,
      },
      onSuccess: [
        {
          type: "form/setUploadedFile",
          payload: {
            name: props?.name,
          },
        },
        // {
        //   type: "form/setFormFile",
        //   payload: {
        //     name: props?.name,
        //   },
        // },
      ],
    });
  }

  return (
    <>
      {props?.isShowBtn && (
        <div className="d-flex flex-column align-items-center">
          <input
            {...props}
            className="visually-hidden"
            id={props?.id ? props?.id : "files"}
            type="file"
            ref={ref}
            onChange={handleFileChange}
          />

          <label
            for={props?.id ? props?.id : "files"}
            className="upload-button"
          >
            {getValue() ? (
              <>
                <BoxArrowUp size={18} color="black" />
                {truncateFileName(getValue())}
              </>
            ) : (
              <>
                <BoxArrowUp size={18} color="black" /> Upload
              </>
            )}
          </label>
        </div>
      )}
      {!props?.isShowBtn && (
        <div className="bg-light px-3 rounded d-flex align-items-center justify-content-between">
          <input
            {...props}
            className="visually-hidden"
            id={props?.id ? props?.id : "files"}
            type="file"
            onChange={handleFileChange}
          />
          <p className="px-0 my-0">
            {getValue() ? getValue() : props?.placeholder}
          </p>

          <label
            for={props?.id ? props?.id : "files"}
            className="upload-button"
          >
            <BoxArrowUp size={18} color="black" /> Upload
          </label>
        </div>
      )}
    </>
  );
};

export default Upload;
