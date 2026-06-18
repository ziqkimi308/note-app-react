import { useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router";
import { slugify } from "../utils/slugify";
import type { Note } from "../types/Note";

// type
type NotesListProps = {
	notes: Note[];
	deleteNote: (id: string) => void; // function that takes a string but does not return anything
};

// actual function
export const NotesList = () => {
	// Retrieve
	const { notes, deleteNote } = useOutletContext<NotesListProps>();

	// search query
	const [searchQuery, setSearchQuery] = useState<string>("");
	// tag filter
	const [tagFilter, setTagFilter] = useState<string | null>(null);

	/**
	 * Every time notes changes, this memo function is executed.
	 *
	 * Set is a data structure – a collection of unique values.
	 *
	 * Array.from() is static method that converts iterable data set to a real array.
	 *
	 * @returns {string[]} An array of unique tag names extracted from all notes.
	 */
	const tags = useMemo(() => {
		const set = new Set<string>();

		notes.forEach((n) => n.tags.forEach((t) => set.add(t)));

		return Array.from(set);
	}, [notes]);

	/**
	 * Filter notes with condition:
	 * - If searchQuery is empty → return all notes; otherwise return notes whose title or content matches (case‑insensitive).
	 * - If tagFilter is null → return all notes; otherwise return notes that include the selected tag.
	 *
	 * @returns {Note[]} The filtered array of notes.
	 */
	const filteredNotes = useMemo(() => {
		// explicit return filter()
		const result = notes.filter((n) => {
			const matchesQuery =
				searchQuery.trim() === "" ||
				n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				n.content.toLowerCase().includes(searchQuery.toLowerCase());

			const matchesTag = !tagFilter || n.tags.includes(tagFilter);

			return matchesQuery && matchesTag;
		});

		return result;
	}, [notes, searchQuery, tagFilter]);

	return (
		<div>
			<div className="flex gap-2 mb-4">
				{/* search box */}
				<input
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Search notes..."
					className="border p-2 rounded flex-1"
				/>

				{/* Tag filter dropdown list */}
				<select
					value={tagFilter ?? ""}
					onChange={(e) => setTagFilter(e.target.value || null)}
					className="border p-2 rounded"
				>
					{/* First option */}
					<option value="">All tags</option>

					{/* Remaining options */}
					{tags.map((t) => (
						<option key={t} value={t}>
							{t}
						</option>
					))}
				</select>

				{/* Add new tag - bring to /new route */}
				<Link
					to="/new"
					className="bg-blue-600 text-white px-3 py-1 rounded flex justify-center items-center"
				>
					+ New
				</Link>
			</div>

			{/* Filtered notes */}
			{filteredNotes.length === 0 ? (
				<p className="text-gray-600">No notes found.</p>
			) : (
				<div className="grid gap-4 md:grid-cols-2">
					{filteredNotes
						.slice()
						.reverse()
						.map((n) => (
							<article key={n.id} className="bg-white p-4 rounded shadow-2xl">
								{/* Image */}
								<div className="w-full h-40 rounded mb-3 text-gray-400 text-sm border overflow-hidden">
									{n.featuredImage ? (
										<img
											src={n.featuredImage}
											alt=""
											className="block w-full h-full object-cover"
										/>
									) : (
										<span></span> // optional placeholder text
									)}
								</div>

								{/* Title */}
								<h3 className="text-lg font-medium">{n.title}</h3>

								{/* Content */}
								<div className="w-full h-20">
									<p className="text-gray-700 mt-2">
										{n.content.length > 140
											? n.content.slice(0, 140) + "..."
											: n.content}
									</p>
								</div>

								{/* Another grouped items */}
								<div className="mt-3 text-sm text-gray-500 flex items-center justify-between">
									{/* Views */}
									<div>Views: {n.views}</div>

									{/* Links and Button */}
									<div className="flex gap-3 items-center">
										{/* View */}
										<Link
											to={`/note/${slugify(n.title)}`}
											className="text-blue-600 hover:underline"
										>
											View
										</Link>

										{/* Edit */}
										<Link
											to={`/edit/${n.id}`}
											className="text-yellow-600 hover:underline"
										>
											Edit
										</Link>

										{/* Delete */}
										<button
											onClick={() => deleteNote(n.id)}
											className="text-red-600 hover:underline"
										>
											Delete
										</button>
									</div>
								</div>
							</article>
						))}
				</div>
			)}
		</div>
	);
};
