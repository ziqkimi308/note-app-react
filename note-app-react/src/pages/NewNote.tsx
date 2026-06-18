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
				{/* label */}
				<span className="text-sm font-medium block">Image (Optional)</span>

				{/* image input button */}
				<label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg border border-gray-300 transition-colors duration-200 my-2">
					<svg
						className="w-8 h-8"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<input
						type="file"
						accept="image/*"
						onChange={(e) => handleFile(e.target.files?.[0])}
						className="hidden"
					/>
				</label>
				
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
