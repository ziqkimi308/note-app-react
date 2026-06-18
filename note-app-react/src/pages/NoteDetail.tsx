import { Link, useOutletContext, useParams } from "react-router";
import type { Note } from "../types/Note";
import { slugify } from "../utils/slugify";
import { useEffect } from "react";

type NoteDetailProps = {
	notes: Note[];
	updateNote: (n: Note) => void;
};

export const NoteDetail = () => {
	const {notes, updateNote} = useOutletContext<NoteDetailProps>();
	const { slug } = useParams<{ slug: string }>();
	const note = notes.find((n) => slugify(n.title) === slug || n.id === slug);

	useEffect(() => {
		if (note) {
			const updated = {
				...note,
				views: note.views + 1,
			};
			updateNote(updated);
		}
	}, [slug]);

	if (!note) {
		return (
			<div className="bg-white p-6 rounded shadow">
				<p className="text-red-600">Note not found.</p>
				<Link to="/" className="text-blue-600 hover:underline">
					Back to notes
				</Link>
			</div>
		);
	}

	return (
		<article className="bg-white p-6 rounded shadow">
			{/* image */}
			{note.featuredImage && (
				<img
					src={note.featuredImage}
					alt=""
					className="w-full h-64 object-cover rounded mb-4"
				/>
			)}

			{/* title */}
			<h2 className="text-2xl font-bold">{note.title}</h2>

			{/* views . date */}
			<div className="text-sm text-gray-500 mt-1">
				Views: {note.views} • {new Date(note.createdAt).toLocaleString()}
			</div>

			{/* content */}
			<div className="mt-4 pre-line text-gray-800">{note.content}</div>

			{/* tags */}
			{note.tags.length > 0 && (
				<div className="mt-4">
					<h4 className="text-sm font-medium">Tags</h4>
					<div className="flex gap-2 mt-2">
						{note.tags.map((t) => (
							<span
								key={t}
								className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700"
							>
								{t}
							</span>
						))}
					</div>
				</div>
			)}

			{/* back button */}
			<div className="mt-6">
				<Link to="/" className="text-blue-600 hover:underline">
					← Back
				</Link>
			</div>
		</article>
	);
};
