import { Card, Col, Row, message } from "antd";
import { CheckCircleTwoTone, FieldTimeOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookings } from "../../user";
import SVG from 'react-inlinesvg';

const QRCode = require("qrcode")
const URL_Fetch_All="http://10.172.53.223:8090/users/bookings/fetch-all";
const HistoryCard = (props)=>{
  console.log(props)
  const [Svg, setSVG] = useState(undefined);
  useEffect(()=>{
    QRCode.toString('Encode this text in QR code', {
      errorCorrectionLevel: 'H',
      type: 'svg'
    }, function(err, data) {
      if (err) throw err;
      
      console.log(data);
      setSVG(data)
    });
  },[])
  // useEffect(()=>{
    
  //   QRCode.toString('Encode this text in QR code', {
  //     errorCorrectionLevel: 'H',
  //     type: 'svg'
  //   }, function(err, data) {
  //     if (err) throw err;
  //     console.log(data);
  //     setSVG(data)
  //   });
  // },[props.data]);
  const svgStr = Svg;
  const svg = new Blob([svgStr], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svg);
  return ( <Col span={24}>
      <Card
        bordered={false}

      > <img src={url} />
        <div>Lekki Gardens Car Park A</div>
      </Card>
    </Col>)
}
const History = () => {
  const userState = useSelector(state=>state.user);
  const dispatch = useDispatch()
  console.log(userState)
  

  const fetchBookings = async ()=>{
    try{
      
      let response = await fetch(URL_Fetch_All,{
        method:"POST",
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({
          "user_id":userState.userId
        })})
        let data = await response.json()
        console.log(data.bookings)
        dispatch(addBookings(data.bookings))
    }catch(error){
      message.error("Error in fetching Bookings")
    }
    }

    useEffect(()=>{
      fetchBookings()

    },[])

  return <div style={{ padding: "20px 20px 0 20px", background: "white" }}>
  <Row gutter={[8, 8]}>
    {userState.bookings.map((each,i)=>{
      return <HistoryCard key={i} data={each} />
    })}
    
  </Row>
</div>
}

export default History;
