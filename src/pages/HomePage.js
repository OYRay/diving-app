import React, { useState } from "react";
import VideoUploader from "../components/VideoUploader";
import VideoPreviewer from "../components/VideoPreviewer";
import ResultPanel from "../components/ResultPanel";
import VideoSampleSelector from "../components/VideoSampleSelector";
import { Typography, Row, Col, Card } from "antd";
// import axios from "axios";

import '../App.css'
const { Title } = Typography;

const HomePage = () => {
  console.log('selector render');

  const [videoSrc, setVideoSrc] = useState(null);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  
  async function uploadVideo(videoFile) {

    setIsLoading(true);
    setIsError(false);
    setVideoSrc(videoFile);

    const formData = new FormData();
    formData.append("video", videoFile);
  
    try {
      const response = await fetch("https://your-backend-url.com/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Error uploading video");
      }
  
      const result = await response.json();
      console.log("Video uploaded successfully:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div >
      <Row style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        <Title>Diving Scoring</Title>
      </Row>
      <Row gutter={20} style={{display:'flex', justifyContent:'center', alignItems:'center', paddingLeft: "10%", paddingRight: "10%"}}>
        <Col xs={24} sm={12}>
          <VideoUploader beforeUpload={uploadVideo} />
        </Col>
        <Col xs={24} sm={12}>
          <VideoSampleSelector onSampleSelect={uploadVideo} />
        </Col>
      </Row>

      {videoSrc ? (
        <Row gutter={8} justify={"space-around"} align={"top"} style={{paddingTop: 50}}>
          <Col xs={20} sm={10}>
            <Card style={{padding:0, margin:0}}> 
              <VideoPreviewer src={videoSrc} />
            </Card>
          </Col>

          <Col sxs={24} sm={12}>
            <ResultPanel
              result={response}
              isLoading={isLoading}
              isError={isError}
            />
          </Col>
        </Row>
        ):
          null
        }
    </div>
  );
};

export default HomePage;

