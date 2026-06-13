import { useState, type SyntheticEvent } from "react";
import type { Note } from "../types/Note";
import { useNavigate, useOutletContext } from "react-router";
import { fileToBase64 } from "../utils/fileToBase64";
import { slugify } from "../utils/slugify";

type NewNoteProps = {
	addNote: (n: Note) => void;
};

export const NewNote = () => {
	const { addNote } = useOutletContext<NewNoteProps>();

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [tagsInput, setTagsInput] = useState("");
	const [featuredImage, setFeaturedImage] = useState<string | null>(null);

	// react router hooks
	const navigate = useNavigate();

	const handleFile = async (file?: File) => {
		if (!file) return;

		const data = await fileToBase64(file);
		setFeaturedImage(data);
	};

	const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!title.trim() || !content.trim()) return;

		// Sanitize tags
		const tags = tagsInput
			.split(",")
			.map((t) => t.trim())
			.filter(Boolean); // filter(Boolean) removes all falsy values

		// Prepare data
		const note: Note = {
			id: crypto.randomUUID(), // Native method - no import needed
			title: title.trim(),
			content: content.trim(),
			tags,
			createdAt: new Date().toISOString(),
			views: 0,
			featuredImage,
		};

		// Add newe data
		addNote(note);

		// Redirect
		navigate(`/note/${slugify(note.title)}`);
	};

	return (
		<form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
			{/* title */}
			<label className="block mb-2">
				<span className="text-sm font-medium">Title</span>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="mt-1 block w-full border rounded p-2"
					placeholder="My note title"
				/>
			</label>

			{/* content */}
			<label className="block mb-2">
				<span className="text-sm font-medium">Content</span>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					rows={8}
					className="mt-1 block w-full border rounded p-2"
					placeholder="Write your note..."
				/>
			</label>

			{/* Tags */}
			<label className="block mb-2">
				<span className="text-sm font-medium">Tags (comma separated)</span>
				<input
					value={tagsInput}
					onChange={(e) => setTagsInput(e.target.value)}
					className="mt-1 block w-full border rounded p-2"
					placeholder="work, ideas"
				/>
			</label>

			{/* featured image */}
			<label className="block mb-2">
				<span className="text-sm font-medium">Image (Optional)</span>
				<input
					type="file"
					accept="image/*"
					onChange={(e) => handleFile(e.target.files?.[0])}
					className="mt-1 block w-full"
				/>
				{/* display image if any */}
				{featuredImage && (
					<img
						src={featuredImage}
						alt=""
						className="mt-2 w-48 h-32 object-cover rounded"
					/>
				)}
			</label>

			{/* Save and reset */}
			<div className="flex gap-2">
				<button
					type="submit"
					className="bg-green-600 text-white px-4 py-2 rounded"
				>
					Save Note
				</button>
				<button
					type="button"
					onClick={() => {
						setTitle("");
						setContent("");
						setTagsInput("");
						setFeaturedImage(null);
					}}
					className="bg-gray-200 px-4 py-2 rounded"
				>
					Reset
				</button>
			</div>
		</form>
	);
};
