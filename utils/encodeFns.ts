import LZString from 'lz-string';

/**
 * Encodes a given string into a base64 string.
 *
 * This function encodes the input string into a base64 string. If the code is
 * running in a browser environment, it uses `window.btoa` for encoding.
 * Otherwise, it uses Node.js's `Buffer` for encoding.
 *
 * @param data - The string to be encoded.
 * @returns The base64 encoded string representation of the input string.
 */
export const encodeString = (data: string) => {
  try {
    return LZString.compressToEncodedURIComponent(data);
  } catch (ex) {}
  return '';
}

/**
 * Decodes a given base64 string into a string.
 *
 * This function decodes the input base64 string into a string. If the code is
 * running in a browser environment, it uses `window.atob` for decoding.
 * Otherwise, it uses Node.js's `Buffer` for decoding.
 *
 * @param data - The base64 encoded string to be decoded.
 * @returns The string decoded from the input base64 string.
 */
export const decodeString = (data: string) => {
  try {
    return LZString.decompressFromEncodedURIComponent(data);
  } catch (ex) {}
  return '';
}
