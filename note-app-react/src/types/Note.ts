export interface Note {
	id: string;
	title: string;
	content: string;
	tags: string[];
	createdAt: string;
	views: number;
	featuredImage?: string | null;
}