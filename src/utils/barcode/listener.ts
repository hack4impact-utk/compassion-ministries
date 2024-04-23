let prevTime = Date.now();
let scanBuffer = '';
let maxInterval = 100;
const specialKeys = [
  'Shift',
  'CapsLock',
  'Tab',
  'Backspace',
  'Control',
  'Alt',
  'Meta',
  'PageUp',
  'PageDown',
  'Enter',
  'Insert',
];

import { usParse } from './parse';

/**
 * Resets the scanner to an initial state, with either nothing in the buffer or the initial character.
 * @param {String} initialChar The initial character to put in the buffer.
 */
function reset(initialChar = '') {
  prevTime = Date.now();
  if (initialChar === 'Enter' || initialChar === 'Shift') {
    initialChar = '';
  }
  scanBuffer = initialChar;
}

/**
 * Creates a barcode scanner that listens for keypress events and emits events when a barcode is successfully scanned.
 * @param {Number} interval The maximum time between keypresses in milliseconds.
 */
function createBarcodeScanner(interval = 100) {
  maxInterval = interval;
  window.addEventListener('keydown', handleKeypress);
}

/**
 * Removes the event listener for the barcode scanner.
 */
export function teardownBarcodeScanner() {
  window.removeEventListener('keydown', handleKeypress);
}

// Takes a scanned barcode and parses it to see if it is a license
async function handleBarcode({
  detail: { data: v },
}: {
  detail: { data: string };
}) {
  const leadingChar = v.charCodeAt(0);
  // Guard. If the barcode doesn't begin with either `@` or `%`, just return
  if ([64, 37].indexOf(leadingChar) < 0) return;

  let parsed;
  // If the first character is `@`, try to decode with usParse
  // If the first character is `%`, try to decode with caParse
  if (leadingChar === 64) {
    parsed = usParse(v);
  }
  // If the return object has any errors, log them
  if (parsed?.errors && parsed.errors.length) {
    try {
      const checksum = btoa(
        JSON.stringify({
          v,
          errors: parsed.errors,
        })
      );
      console.error('Error parsing barcode', parsed.errors, checksum);
    } catch (error) {
      console.log('Error generating checksum', error);
    }
  }
  return parsed;
}

/**
 * Emits an event when the barcode is successfully scanned.
 */
async function emitOnBarcode() {
  // replace "NumLock0010NumLock" with empty string
  const parsed = await handleBarcode({ detail: { data: scanBuffer } });
  const event = new CustomEvent('onbarcode', {
    detail: {
      data: parsed,
    },
  });
  window.dispatchEvent(event);
}

/**
 * Emit an event when the license scan is started
 */
function emitStartBarcode() {
  const event = new Event('onbarcodestart');
  window.dispatchEvent(event);
}

/**
 * Emits an event when the barcode fails to scan.
 */
// function emitOnBarcodeFail() {
//   const event = new Event('onbarcodefail');
//   window.dispatchEvent(event);
// }

/**
 * Handles the keypress event, adding the character to the buffer and emitting events as necessary.
 * @param {KeyboardEvent} e The keypress event.
 */
function handleKeypress(e: KeyboardEvent) {
  const now = Date.now();
  const maxTimeBetween = maxInterval;

  // too much time has passed between keystrokes, reset and use this keystroke
  // as the first character of a new scan
  if (now - prevTime > maxTimeBetween) {
    reset();
  }

  if (scanBuffer.length === 2 && scanBuffer === '}@') {
    emitStartBarcode();
    // remove first characyer from buffer
    scanBuffer = '@';
  }

  if (!specialKeys.includes(e.key)) {
    scanBuffer += e.key;
  }

  // if enter is pressed, emit event
  if (
    e.key === 'Tab' &&
    scanBuffer.length > 0 &&
    scanBuffer.charAt(0) === '@'
  ) {
    emitOnBarcode();
    reset();
  }

  prevTime = now;
}

export default createBarcodeScanner;
