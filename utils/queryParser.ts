import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

/**
 * Encodes a given data object into a base64 string.
 *
 * This function converts the input data object into a JSON string and then
 * encodes it into a base64 string. If the code is running in a browser
 * environment, it uses `window.btoa` for encoding. Otherwise, it uses
 * Node.js's `Buffer` for encoding.
 *
 * @param data - The data object to be encoded. It should be a record with string keys and values of any type.
 * @returns The base64 encoded string representation of the input data.
 */
export const encodeQueryData = async (data: Record<string, unknown>) =>
  compressToEncodedURIComponent(JSON.stringify(data));

/**
 * Decodes a given base64 string into a data object.
 *
 * This function decodes the input base64 string into a JSON string and then
 * converts it into a data object. If the code is running in a browser
 * environment, it uses `window.atob` for decoding. Otherwise, it uses
 * Node.js's `Buffer` for decoding.
 *
 * @param data - The base64 encoded string to be decoded.
 * @returns The data object decoded from the input base64 string.
 */
export const decodeQueryData = (data: string): Record<string, unknown> =>
  JSON.parse(decompressFromEncodedURIComponent(data));
