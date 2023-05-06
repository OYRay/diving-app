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
  
  async function uploadVideo(blobUrl) {
    const videoFile = await fetch(blobUrl);
    const file = new File([await videoFile.blob()], "uploaded_video.mp4", { type: "video/mp4" });

    setIsLoading(true);
    setIsError(false);
    setVideoSrc(blobUrl);

    const formData = new FormData();
    formData.append("video", file);
    console.log("Video file:", file);

    // fetch backend
    try {
      console.log("Uploading video");
      const response = await fetch("http://localhost:5000/videoupload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        setIsLoading(false)
        setIsError(true) 
        console.log("Error getting response");
      }
      
      // wait response
      const result = await response.json();
      setIsLoading(false)
      setResponse(result)
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

