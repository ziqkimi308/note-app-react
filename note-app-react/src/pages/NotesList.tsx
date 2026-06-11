import { useState } from "react";

// type
type NotesListProps = {
	notes: Note[];
	onDelete: (id: string) => void; // function that takes a string but does not return anything
};

// actual function
export const NotesList = ({notes, onDelete}: NotesListProps) => {
	
	// search query
	const [searchQuery, setSearchQuery] = useState<string>("");
	// tag filter
	const [tagFilter, setTagFilter] = useState<string | null>(null);
}