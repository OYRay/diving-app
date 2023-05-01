import React, { useState } from "react";
import { Select, Button, Typography, Row, Col } from "antd";
import VideoPreviewer from "./VideoPreviewer";

import sample1 from "../data/sample1.mp4";
import sample2 from "../data/sample2.mp4";
import sample3 from "../data/sample3.mp4";

const { Option } = Select;
const { Title } = Typography;

const sampleVideos = [
  { key: 0, label: "Sample 1", value: {video: sample1, score: 89, code: '12c3', difficulty: 6 }},
  { key: 1, label: "Sample 2", value: {video: sample2, score: 76, code: '32c31', difficulty: 7 }},
  { key: 2, label: "Sample 3", value: {video: sample3, score: 82, code: '52c31', difficulty: 5 }},
];

const VideoSampleSelector = ({ onSampleSelect }) => {
  const [selectedVideo, setSelectedVideo] = useState(0);

  const handleChange = (value) => {
    setSelectedVideo(value);
  };

  const handleButtonClick = () => {
    if (selectedVideo !== null ) {
      const file = sampleVideos[selectedVideo].value.video;
      onSampleSelect(file);
    }
  };

  return (
    <div style={{width:"100%", display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <Title level={4}>Try some samples</Title>
      <div className="upload-area">
        <Row justify="space-around" align="middle" gutter={8} style={{paddingLeft: '5%'}} >
          <Col xs={24} sm={12}>
            {selectedVideo !== null ? (
              <div style={{width:"90%", display:'flex'}} >
                <VideoPreviewer src={sampleVideos[selectedVideo].value.video} />
              </div>
            ) : (
              <div>Error loading video</div>
            )}
          </Col>
          
          <Col xs={24} sm={12}>
            <Row>
              <Select
                placeholder="Select a sample video"
                style={{ width: 120 }}
                onChange={handleChange}
                defaultValue={0}
              >
                {sampleVideos.map((video) => (
                  <Option key={video.key} value={video.key}>
                    {video.label}
                  </Option>
                ))}
              </Select>
            </Row>
            <Row  style={{display:'flex', flexDirection:'column', justifyContent:'left', alignItems:'left'}}>
              <div>score: {sampleVideos[selectedVideo].value.score}</div>
              <div>code: {sampleVideos[selectedVideo].value.code}</div>
              <div>difficulty: {sampleVideos[selectedVideo].value.difficulty}</div>
            </Row>
            <Row>
              <Button onClick={handleButtonClick} style={{ marginTop: 16 }}>
                Analyze Sample Video
              </Button>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default React.memo(VideoSampleSelector);
