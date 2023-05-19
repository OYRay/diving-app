import React from "react";
import { Typography, Image, Card, Table, Row, Col} from "antd";
import Spinner from "./Spinner";

import '../App.css'

const { Title } = Typography;

const ResultPanel = ({ result, isLoading, isError }) => {


  const columns = [
    {
      title: "Attribute",
      dataIndex: "attribute",
      key: "attribute",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];
  
  

  const renderResult = () => {
    if (isLoading) {
      return <Spinner />;
    }
  
    if (isError) {
      return <div>Error getting results. Please try again.</div>;
    }

    const data = [
      // { key: "1", attribute: "Final Predicted Score", value: result.final_score },
      { key: "2", attribute: "I3D Score", value: result.auto_score },
      { key: "3", attribute: "Predicted Number of Somersaults", value: result.numSomersaults },
      { key: "4", attribute: "Predicted Number of Twists", value: result.numTwists },
      { key: "5", attribute: "Predicted Entry Angle", value: result.EntryAngle },
      { key: "6", attribute: "Predicted Bending Angle", value: result.BendingAngle },
      { key: "7", attribute: "Predicted Mean Splash Index", value: result.MeanSplashIndex },
      { key: "8", attribute: "Predicted Max Splash Index", value: result.MaxSplashIndex },
    ];
    
  
    return (
      <div className="result-panel">
        {/* <p>Final Predicted Score: {result.final_score}</p>
        <p>I3D Score: {result.auto_score}</p>
        <p>Predicted Number of Somersaults: {result.numSomersaults}</p>
        <p>Predicted Number of Twists: {result.numTwists}</p>
        <p>Predicted Entry Angle: {result.EntryAngle}</p>
        <p>Predicted Bending Angle: {result.BendingAngle}</p>
        <p>Predicted Mean Splash Index: {result.MeanSplashIndex}</p>
        <p>Predicted Max Splash Index: {result.MaxSplashIndex}</p> */}
        {/* {result.image && <Image src={result.image } />} */}
        
        <Row gutter={8} justify={"space-around"} align={"top"} style={{padding:0}}>
          <Col xs={22} sm={14}>
            <Table columns={columns} 
                    dataSource={data} 
                    pagination={false} 
                    rowClassName="custom-row"
                    headerClassName="custom-header"/>
          </Col>
          <Col xs={20} sm={8} style={{padding:0}}>
          <Image src={`data:image/jpg;base64, ${result.EntryImage}`} alt="From server" />
          </Col>
        </Row>
      </div>
    );
  }
  

  return (
    <Card title={ result && !isLoading && !isError ? (
                  <Title style={{ marginTop:0, paddingTop:0}} level={4}>Final Predicted Score: {result.final_score} </Title>
                ):(<Title level={4}>Result</Title>
                )} 
                bordered={false} 
                style={{ width: "100%", margin:0, padding:0}}>
      {renderResult()}
    </Card>
  );
};

export default ResultPanel;
