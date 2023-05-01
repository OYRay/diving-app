import React from "react";
import { Typography, Image, Card } from "antd";


const VideoPreviewer = ({ src }) => {
  if (!src) return null;

  return (
    <div>
      <video
      src={src}
      width="100%"
      controls
      autoPlay
      muted
      // style={{ marginTop: "20px" }}
    />
    </div>
  );
};

export default VideoPreviewer;
