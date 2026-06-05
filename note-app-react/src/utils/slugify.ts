/**
 * Converts a string into a URL-friendly slug.
 *
 * - Lowercases all characters.
 * - Trims whitespace from both ends.
 * - Replaces non-alphanumeric characters with hyphens.
 * - Removes leading and trailing hyphens.
 *
 * @param {string} title - The input string to slugify.
 * @returns {string} A slugified version of the input string.
 * @example
 * slugify("Hello World!") // "hello-world"
 * slugify("  React Router v7  ") // "react-router-v7"
 */
export function slugify(title: string): string {
	return title
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-") // replace anything not alphabets or numbers to -
		.replace(/(^-|-$)+/g, ""); // replace - at start or end with blank
}
