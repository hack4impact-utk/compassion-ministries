'use client';
import React from 'react';
import { OCRClient } from 'tesseract-wasm';

function capitalizeFirstLetterOfEachWord(str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// create an ImageBitmap from the uploaded image
async function createImageBitmapFromFile(file: File): Promise<ImageBitmap> {
  const bitmap = await createImageBitmap(file);
  return bitmap;
}

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

const ocr = new OCRClient();

interface LicenseData {
  name: string;
  address: string;
}

export default function LicensePage() {
  const [processing, setProcessing] = React.useState(false);
  const [licenseData, setLicenseData] = React.useState<LicenseData | null>(
    null
  );

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProcessing(true);
    const files = event.target.files;
    if (!files || files.length !== 1) {
      return;
    }
    const file = files[0];
    const imageBitmap = await createImageBitmapFromFile(file);

    try {
      await ocr.loadModel(
        'https://raw.githubusercontent.com/tesseract-ocr/tessdata_fast/main/eng.traineddata'
      );

      await ocr.loadImage(imageBitmap);

      const text = await ocr.getText();

      const ld = extractLicenseData(text);
      if (ld) {
        setLicenseData(ld);
      } else {
        console.error('could not extract license data');
      }
    } finally {
      ocr.destroy();
      setProcessing(false);
    }
  };

  return (
    <div>
      <h1>License Page</h1>
      <input type="file" onChange={handleFileUpload} />
      {processing && <p>Processing...</p>}
      {licenseData && (
        <div>
          <p>Name: {licenseData.name}</p>
          <p>Address: {licenseData.address}</p>
        </div>
      )}
    </div>
  );
}
