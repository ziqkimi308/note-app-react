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
