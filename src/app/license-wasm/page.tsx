'use client';
import React, { useEffect, useRef, useState } from 'react';
import { OCRClient } from 'tesseract-wasm';

function capitalizeFirstLetterOfEachWord(str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/*
// create an ImageBitmap from the uploaded image
async function createImageBitmapFromFile(file: File): Promise<ImageBitmap> {
  const bitmap = await createImageBitmap(file);
  return bitmap;
}
*/

function extractLicenseData(text: string) {
  const lines = text.split('\n').filter((line) => line.length > 0);

  // find idx of line with format "DD <number of any length>"
  const ddLineIdx = lines.findIndex((line) => line.startsWith('DD '));
  if (ddLineIdx === -1) {
    console.log('dd');
    return;
  }

  // get all lines after DD line
  const infoLines = lines.slice(ddLineIdx + 1);

  // for tn licenses, the length of this list should be 4
  if (infoLines.length !== 4) {
    // get idx of line with format "<city>, <two letter state> <zip>"
    // for example "KNOXVILLE, TN 37917"
    const cityStateZipIdx = infoLines.findIndex((line) =>
      line.match(/^[A-Z]+, [A-Z]{2} [0-9]{5}$/)
    );
    if (cityStateZipIdx === -1) {
      console.log('csz');
      console.log(infoLines);
      return;
    }

    // remove lines after cityStateZipIdx
    infoLines.splice(cityStateZipIdx + 1);
  }

  const firstName = capitalizeFirstLetterOfEachWord(
    infoLines[1].split(' ')[0].toLowerCase()
  );
  const lastName = capitalizeFirstLetterOfEachWord(infoLines[0].toLowerCase());
  const addressLine1 = capitalizeFirstLetterOfEachWord(
    infoLines[2].toLowerCase()
  );
  const splitCSZ = infoLines[3].split(' ');
  // remove comma from city
  const city = capitalizeFirstLetterOfEachWord(
    splitCSZ[0].slice(0, -1).toLowerCase()
  );
  const state = splitCSZ[1];
  const zip = splitCSZ[2];

  return {
    name: `${firstName} ${lastName}`,
    address: `${addressLine1}, ${city}, ${state} ${zip}`,
  };
}

interface LicenseData {
  name: string;
  address: string;
}

export default function LicensePage() {
  // video and canvas elements, and state for storing license data and any errors
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [licenseData, setLicenseData] = useState<LicenseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // camera constraints
  useEffect(() => {
    const constraints = {
      audio: false,
      video: { facingMode: 'environment' },
    };

    // initialize camera stream
    async function initializeCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        setError('Unable to access camera');
        console.error('Error accessing camera:', err);
      }
    }

    // process video frame and extract license data
    async function processFrame() {
      if (!videoRef.current || !canvasRef.current) return;
      const context = canvasRef.current.getContext('2d');
      if (context) {
        // video frame to the canvas
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        // create an ImageBitmap from the canvas
        const imageBitmap = await createImageBitmap(canvasRef.current);

        // load OCR model and image, then extract text
        try {
          const ocrClient = new OCRClient();
          console.log('AD');
          await ocrClient.loadModel(
            'https://raw.githubusercontent.com/tesseract-ocr/tessdata_fast/main/eng.traineddata'
          );
          console.log('BD');
          await ocrClient.loadImage(imageBitmap);
          const text = await ocrClient.getText();
          const data = extractLicenseData(text);
          console.log(data);
          if (data) {
            setLicenseData(data);
          } else {
            ocrClient.destroy();
            console.error('could not extract license data');
          }
        } catch (err) {
          console.error('OCR processing error:', err);
        }
      }
    }
    // Initialize camera and set interval for processing frames
    initializeCamera();
    const interval = setInterval(processFrame, 2000); // Process every X seconds

    // Copy videoRef.current to a variable inside the effect
    const currentVideoElement = videoRef.current;

    return () => {
      clearInterval(interval);
      if (currentVideoElement && currentVideoElement.srcObject) {
        (currentVideoElement.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ display: 'block' }}
      ></canvas>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="640"
        height="480"
        style={{ display: 'block' }}
      ></video>
      {licenseData && (
        <div>
          <p>Name: {licenseData.name}</p>
          <p>Address: {licenseData.address}</p>
        </div>
      )}
    </div>
  );
}
