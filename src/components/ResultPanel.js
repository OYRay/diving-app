import React from "react";
import { Typography, Image, Card } from "antd";
import Spinner from "./Spinner";
const { Title } = Typography;

const ResultPanel = ({ result, isLoading, isError }) => {

  const renderResult = () => {
    if (isLoading) {
      return <Spinner />;
    }
  
    if (isError) {
      return <div>Error getting results. Please try again.</div>;
    }
  
    return (
      <div className="result-panel">
        <p>{result.file_name}</p>
        {/* {result.image && <Image src={result.image } />} */}
      </div>
    );
  }
  

  return (
    <Card title={<Title level={4}>Result</Title>} bordered={false} style={{ width: "100%" }}>
      {renderResult()}
    </Card>
  );
};

export default ResultPanel;
