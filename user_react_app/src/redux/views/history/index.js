import { Card, Col, Row } from "antd";
import { CheckCircleTwoTone, FieldTimeOutlined } from "@ant-design/icons";
import React from "react";

const History = () => (
  <div style={{ padding: "20px 20px 0 20px", background: "white" }}>
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Card
          bordered={false}
          actions={[
            <CheckCircleTwoTone twoToneColor="#52c41a" />,
            <div>4/6/23 9:30</div>,
            <div>
              <FieldTimeOutlined /> 1 Hr: 30 Min
            </div>,
          ]}
        >
          <div>Lekki Gardens Car Park A</div>
        </Card>
      </Col>
      Completed Sessions
      <Col span={24}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={24}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
  </div>
);

export default History;
