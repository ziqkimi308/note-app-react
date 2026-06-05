/**
 * Represents a note object in the system.
 *
 * @property {string} id - Unique identifier for the note.
 * @property {string} title - Title of the note.
 * @property {string} content - Main text content of the note.
 * @property {string[]} tags - List of tags associated with the note.
 * @property {string} createdAt - ISO date string when the note was created.
 * @property {number} views - Number of times the note has been viewed.
 * @property {string|null} [featuredImage] - Optional featured image URL or null if not set.
 */
export interface Note {
	id: string;
	title: string;
	content: string;
	tags: string[];
	createdAt: string;
	views: number;
	featuredImage?: string | null;
}
