export function slugify(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-") // replace anything not alphabets or numbers to -
		.replace(/(^-|-$)+/g, ""); // replace - at start or end with blank
}