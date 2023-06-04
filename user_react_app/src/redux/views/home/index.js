import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Input,
  Row,
  Select,
  TimePicker,
  message,
} from "antd";
import MapView from "../mapview";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../../user";

const Home = () => {
  const dispatch = useDispatch();
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Booking History
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Settings
        </a>
      ),
    },
    {
      key: "3",
      danger: true,
      label: <Link onClick={() => dispatch(signOut())}>Logout</Link>,
    },
  ];
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div
        style={{
          position: "absolute",
          height: "100vh",
          width: "100vw",
          zIndex: 0,
        }}
      >
        <MapView />
      </div>
      <div
        className="mainView"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100vw",
          height: "100vh",
          zIndex: 10,
          flexDirection: "column",
          backgroundColor: "transparent",
          color: "#000",
        }}
      >
        <div
          style={{
            padding: "20px 20px 0 20px",
            background: "white",
            display: "flex",
            flexWrap: "nowrap",
            gap: "10px",
          }}
        >
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            style={{ padding: 0, margin: 0 }}
          >
            <Button
              icon={
                <MenuOutlined
                  style={{
                    margin: "0",
                    textAlign: "center",
                    width: "100%",
                  }}
                />
              }
              style={{ width: "min-content" }}
            >
              {" "}
            </Button>
          </Dropdown>
          <Form.Item name="query" style={{ width: "100%" }}>
            <Input size="large" placeholder="Search Parking Lots..." />
          </Form.Item>
        </div>
        <div style={{ padding: "20px" }}>
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              padding: "20px 0",
            }}
          >
            <Button
              size="large"
              type="primary"
              style={{ backgroundColor: "white", color: "#000" }}
              shape="circle"
              onClick={() => message.success("Fetching Location...")}
            >
              📍
            </Button>
          </div>
          <Card bordered={false} style={{ width: "100%" }}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              {" "}
              <Form.Item name="parkinglocations">
                <Select value={"disabled"}>
                  <Select.Option disabled value="disabled">
                    Please Select the Parking Lot Locations
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="time">
                <TimePicker.RangePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="time">
                <Input type="text" placeholder="Please enter the reason" />
              </Form.Item>
              <Form.Item>
                <Row>
                  <Col span={12}>
                    Fare: <b>₹ 100</b>
                  </Col>
                  <Col
                    span={12}
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    <Button size="large" type="primary" htmlType="submit">
                      Book Now
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
