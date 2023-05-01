import React from "react";
import { Upload, Button, message, Typography } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import '../App.css'
const { Title } = Typography;

const VideoUploader = ({ beforeUpload }) => {
  console.log('uploader render');
  const uploadProps = {
    accept: "video/mp4",
    showUploadList: false,
    beforeUpload: (file) => {
      if (checkFileType(file)) {
        beforeUpload(URL.createObjectURL(file));
      }
    },
  };

  const checkFileType = (file) => {
    if (file.type !== "video/mp4") {
      message.error("Please upload an mp4 video file");
      return false;
    }
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 1) {
      message.error("Please upload only one video at a time");
      return false;
    }

    const file = files[0];
    if (checkFileType(file)) {
      beforeUpload(URL.createObjectURL(file));
    }
  };

  return (
    <div width="100%" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <Title level={4}>Upload a diving video</Title>
      <Upload {...uploadProps} className="video-uploader" style={{ display: "none" }}>
        <div
          className="upload-area"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div style={{ padding: 0}}>
            <InboxOutlined className="upload-icon" />
          </div>
          <div style={{ padding: 5, fontSize: 16}}>Click or drag file to this area to upload</div>
          <div style={{ padding: 0, color: "grey"}}>
            Support for a single mp4 video upload. Strictly prohibited from uploading company data or other
            banned files.
          </div>
        </div>
      </Upload>
    </div>
  );
};

export default React.memo(VideoUploader); 
