import React, { useRef, useEffect, useState } from "react";
import Webcam, { WebcamProps } from "react-webcam";
import jsQR from "jsqr";
import beep from "./../assets/beep.mp3";
const makeAPIRequest = async (URL: string | undefined) => {
  if (!URL) return;
  let response = await fetch(URL);
  let data = await response.json();
  console.log(data);
};
const QRCodeReader = () => {
  const webcamRef = useRef<Webcam>(null);
  const [qrText, setQRText] = useState<string>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  function play(data: string) {
    var beepsound = new Audio(beep);
    beepsound.play();
    beepsound.onended = () => {
      makeAPIRequest(data);
      console.log("is eneded");
      setIsPlaying(false);
      setQRText("");
    };
  }
  const handleScan = () => {
    const video = webcamRef.current?.video;

    if (video) {
      const canvas = document.createElement("canvas");
      const canvasContext = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvasContext?.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvasContext?.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      const code =
        imageData && jsQR(imageData?.data, canvas.width, canvas.height);

      if (code) {
        if (!isPlaying) {
          console.log("QR code:", code.data);
          setQRText(code.data);
          play(code.data);
          setIsPlaying(true);
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleScan();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Webcam
        ref={webcamRef}
        videoConstraints={{ facingMode: "environment" }}
        style={{ width: "100%", height: "auto" }}
      />
      <p>QR Code Text: {qrText}</p>
    </div>
  );
};

export default QRCodeReader;
