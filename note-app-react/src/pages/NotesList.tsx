import { useMemo, useState } from "react";

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

	// Everytime notes changes, tags memo function being executed
	const tags = useMemo(()=>{
		// set is data structure a collection of unique values
		const set = new Set<string>();

		notes.forEach((n) => n.tags.forEach((t) => set.add(t)));

		// array static method which converts iterables data set to real array
		return Array.from(set);
	}, [notes]);

	
}