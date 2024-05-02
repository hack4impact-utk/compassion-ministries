import createBarcodeScanner, {
  teardownBarcodeScanner,
} from '@/utils/barcode/listener';
import { useEffect, useState } from 'react';

interface UseBarcodeOptions {
  strokeInterval: number; // The allowed time in milliseconds between each stroke
  barcodeStartHandler: (e: any) => void; // The handler to call when a barcode scan starts
}

export default function useLicenseScanner(
  barcodeHandler: (e: any) => void,
  options: Partial<UseBarcodeOptions> = { strokeInterval: 200 }
) {
  const [licenseLoading, setLicenseLoading] = useState(false);

  useEffect(() => {
    createBarcodeScanner(200);

    const onBarcodeHandler = (e: any) => {
      setLicenseLoading(false);
      barcodeHandler(e);
    };

    const onBarcodeStartHandler = (e: any) => {
      setLicenseLoading(true);
      options.barcodeStartHandler?.(e);
    };

    window.addEventListener<'onbarcode'>('onbarcode', onBarcodeHandler);
    window.addEventListener<'onbarcodestart'>(
      'onbarcodestart',
      onBarcodeStartHandler
    );
    return () => {
      window.removeEventListener<'onbarcode'>('onbarcode', onBarcodeHandler);
      window.removeEventListener<'onbarcodestart'>(
        'onbarcodestart',
        onBarcodeStartHandler
      );
      teardownBarcodeScanner();
    };
  }, []);

  return { licenseLoading };
}
