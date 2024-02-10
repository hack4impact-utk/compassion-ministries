'use client';
import React from 'react';
import Tesseract from 'tesseract.js';

export default function LicensePage() {
  const [processing, setProcessing] = React.useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProcessing(true);
    const files = event.target.files;
    if (!files || files.length !== 1) {
      return;
    }
    const file = files[0];
    const imageUrl = URL.createObjectURL(file);
    Tesseract.recognize(imageUrl, 'eng', {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      console.log(text);
      setProcessing(false);
    });
  };

  return (
    <div>
      <h1>License Page</h1>
      <input type="file" onChange={handleFileUpload} />
      {processing && <p>Processing...</p>}
    </div>
  );
}
