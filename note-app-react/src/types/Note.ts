/**
 * Represents a note object in the system.
 *
 * @property id - Unique identifier for the note.
 * @property title - Title of the note.
 * @property content - Main text content of the note.
 * @property tags - List of tags associated with the note.
 * @property createdAt - ISO date string when the note was created.
 * @property views - Number of times the note has been viewed.
 * @property featuredImage - Optional featured image URL, or null if not set.
 *
 * @example
 * const note: Note = {
 *   id: "123",
 *   title: "Meeting Notes",
 *   content: "Discussed project milestones...",
 *   tags: ["work", "planning"],
 *   createdAt: "2026-06-11T10:00:00Z",
 *   views: 42,
 *   featuredImage: null
 * };
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
