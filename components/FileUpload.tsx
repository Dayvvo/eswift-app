import React, { useRef, useState } from "react";
import { Text } from "@chakra-ui/react";
import axios from "axios";
import useToast from "../hooks/useToast";

const FileUpload = ({
  w,
  left,
  setImage,
}: {
  w?: string;
  left?: string;
  setImage?: any;
}) => {
  const [file, setFile] = useState<any>({ file: { file: "", progress: 0 } });
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const [previewImage, setPreviewImage] = useState<any>("");
  const { toast } = useToast();

  const selectFile = useRef<HTMLInputElement>(null);

  const handleFileUpload = (data: any) => {
    const token = localStorage.getItem("") || "";

    const formData = new FormData();

    formData.append("file", data);

    const request = axios.create({
      baseURL: `/api/v1/kitchens/upload-kitchen-kyc`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent: any) => {
        setFile({
          file: data,
          progress: (progressEvent.loaded * 100) / progressEvent.total,
        });
      },
    });

    request
      .post(
        `/api/v1/kitchens/upload-kitchen-kyc`,
        formData
      )
      .then((res: any) => {
        setImage(res?.data?.data?.url);
      });
  };

  const MAX_FILE_SIZE_MB = 2.5;

  const handleSelectFile = (e: any) => {
    selectFile.current?.click();
    if (e.target.files) {
      const selectedFile = e.target.files[0];

      const fileSizeInMB = selectedFile.size / (1024 * 1024);

      if (fileSizeInMB > MAX_FILE_SIZE_MB) {
        toast({
          status: "error",
          title: "Image cannot be uploaded",
          description: "Image file exceeds 2.5mb",
        });
        return;
      }

      handleFileUpload(selectedFile);
      setShowUploadProgress(true);
      setFile({ file: selectedFile, progress: 0 });
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPreviewImage(reader?.result as string);
      });
      reader.readAsDataURL(selectedFile);
    }
  };

  return showUploadProgress ? (
    <>
      {file.progress === 100 ? (
        <div style={{ position: "relative" }}>
          <img
            alt="preview-img"
            src={previewImage}
            style={{
              width: "100%",
              display: "block",
              height: "16em",
              objectFit: "cover",
            }}
          />
          <button
            type="button"
            onClick={handleSelectFile}
            style={{
              position: "absolute",
              right: "4px",
              top: "4px",
              background: " #fff4ea",
              color: "#F18318",
              padding: "4px",
              borderRadius: "8px",
            }}
          >
            Change Image
          </button>
          <input
            type="file"
            name="file"
            accept=".jpg,.jpeg,.png"
            style={{ display: "none" }}
            ref={selectFile}
            onChange={handleSelectFile}
          />
        </div>
      ) : (
        <>/</>
        // <UploadProgress file={file} />
      )}
    </>
  ) : (
    <div>
      {/* Your custom styling for the input container */}
      <label
        htmlFor="fileInput"
        style={{
          cursor: "pointer",
          display: "block",
          padding: "2rem",
          marginTop: "1rem",
          border: "1px solid #FEE1C4",
          borderRadius: "16px",
          position: "relative",
          overflow: "hidden",
          width: w || "initial",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: left || "135px",
            top: "20px",
            color: "black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {/* <Upload /> */}
          <Text
            color={"#0A070F"}
            fontSize={"14px"}
            fontWeight={"500"}
            fontFamily={"galano grotesque"}
          >
            Upload a file
          </Text>
        </div>
        <input
          type="file"
          id="fileInput"
          accept=".jpg,.jpeg,.png"
          ref={selectFile}
          onChange={handleSelectFile}
          style={{
            width: "100%",
            height: "100%",
            opacity: "0",
            cursor: "pointer",
          }}
        />
      </label>
      <Text
        color={"#AA9F93"}
        fontFamily={"galano grotesque"}
        fontSize={"12px"}
        fontWeight={"500"}
        marginTop={"1rem"}
      >
        Upload format; JPEG or PNG only. Max file size:2.5MB
      </Text>
    </div>
  );
};

export default FileUpload;
