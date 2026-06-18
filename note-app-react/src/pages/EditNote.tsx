import { useNavigate, useOutletContext, useParams } from "react-router";
import type { Note } from "../types/Note";
import { useState, type SyntheticEvent } from "react";
import { fileToBase64 } from "../utils/fileToBase64";

type EditNoteProps = {
	notes: Note[];
	updateNote: (n: Note) => void;
};

/**
 * Wraps the EditNote component to force a full reset when the note ID changes.
 *
 * When navigating from /edit/1 to /edit/2, React would normally reuse the
 * same component instance and preserve its internal useState values.
 * By passing the `id` as a `key` prop to EditNote, React destroys the old
 * component and mounts a fresh one, ensuring the form state correctly
 * reflects the new note data without needing a useEffect.
 *
 * @param {Note[]} props.notes - Array of all available notes.
 * @param {(n: Note) => void} props.updateNote - Function to update a note.
 * @returns {JSX.Element} The EditNote component with a dynamically set key.
 */
export const EditNoteWrapper = () => {
	const { notes, updateNote } = useOutletContext<EditNoteProps>();
	const { id } = useParams<{ id: string }>();
	if (!id) return <div>Loading...</div>;

	return <EditNote key={id} notes={notes} updateNote={updateNote} />;
};

/**
 * A form component for editing an existing note.
 *
 * The form state (title, content, tags, image) is tracked via useState,
 * but the initial values are only read on mount. To handle URL changes
 * (e.g., switching from editing note 1 to note 2), this component relies
 * on its parent (EditNoteWrapper) to remount it using the `key` prop.
 *
 * @param {Note[]} props.notes - All notes passed from the parent.
 * @param {(n: Note) => void} props.updateNote - Callback to save changes.
 * @returns {JSX.Element} The note editing form.
 */
const EditNote = ({ notes, updateNote }: EditNoteProps) => {
	// Retrieve id from url path
	const { id } = useParams<{ id: string }>();
	// Use retrieved id to fetch note
	const note = notes.find((n) => n.id === id);
	const navigate = useNavigate();

	const [title, setTitle] = useState(note?.title ?? "");
	const [content, setContent] = useState(note?.content ?? "");
	const [tagsInput, setTagsInput] = useState(note?.tags.join(", ") ?? "");
	const [featuredImage, setFeaturedImage] = useState<string | null>(
		note?.featuredImage ?? null,
	);
	const [error, setError] = useState<string | null>(null);

	// Hooks must be called unconditionally at the top level, in the exact same order, on EVERY render. That's why this came after them
	if (!note) {
		return <div className="bg-white p-6 rounded shadow">Note not found</div>;
	}

	// handle image
	const handleFile = async (file?: File) => {
		if (!file) return;
		const data = await fileToBase64(file);
		setFeaturedImage(data);
	};

	// handle submit
	const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		// handle tags
		const tags = tagsInput
			.split(",")
			.map((t) => t.trim())
			.filter(Boolean);
		//handle the rest
		const updated: Note = {
			...note,
			title: title.trim(),
			content: content.trim(),
			tags,
			featuredImage,
		};

		// update
		try {
			updateNote(updated);
			navigate(`/note/${updated.id}`);
		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message || "Failed to update");
			} else {
				setError("Failed to update");
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
			{/* Error status if any */}
			{error && <div className="text-red-600 mb-2">{error}</div>}

			{/* title */}
			<label className="block mb-2">
				<span className="text-sm">Title</span>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="mt-1 block w-full border p-2 rounded"
				/>
			</label>

			{/* content */}
			<label className="block mb-2">
				<span className="text-sm">Content</span>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					rows={8}
					className="mt-1 block w-full border p-2 rounded"
				/>
			</label>

			{/* tags */}
			<label className="block mb-2">
				<span className="text-sm">Tags (comma separated)</span>
				<input
					value={tagsInput}
					onChange={(e) => setTagsInput(e.target.value)}
					className="mt-1 block w-full border p-2 rounded"
				/>
			</label>

			{/* image */}
			<label className="block mb-4">
				{/* image label */}
				<span className="text-sm block">Image (optional)</span>

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

				{/* show image if any */}
				{featuredImage && (
					<img
						src={featuredImage}
						alt=""
						className="mt-2 w-48 h-32 object-cover rounded"
					/>
				)}
			</label>

			{/* Submit */}
			<div className="flex gap-2">
				<button
					type="submit"
					className="bg-yellow-600 text-white px-4 py-2 rounded"
				>
					Save
				</button>
				<button
					type="button"
					onClick={() => navigate(-1)}
					className="bg-gray-200 px-4 py-2 rounded"
				>
					Cancel
				</button>
			</div>
		</form>
	);
};
