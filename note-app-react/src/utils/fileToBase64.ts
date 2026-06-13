/**
 * Helper function - converts image files to base64 strings for local storage.
 * 
 * - FileReader is async without returning promise.
 * - So we convert it into promise-based function.
 *
 * @param file - The image file to convert.
 * @returns A promise that resolves to the base64 string.
 * @throws {DOMException} If the file cannot be read.
 * @example
 * fileToBase64(myFile).then(base64 => {
 *   console.log(base64); // "data:image/png;base64,iVBORw0KG..."
 * });
 */
export function fileToBase64(file: File): Promise<string> {
	// manually create a promise using promise constructor
	return new Promise((resolve, reject) => {
		// File handling using browser api
		const reader = new FileReader();

		// register event when read successfully completed
		reader.onload = () => resolve(String(reader.result)); // anonymous arrow function

		// register event when read fails
		reader.onerror = reject;

		// register events does not mean straight execute. One of the event will trigger after this reading
		reader.readAsDataURL(file);
	});
}
