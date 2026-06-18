import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Outlet } from "react-router";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Note } from "./types/Note";

function App() {
	// fetch notes from localStorage
	const [localNotes, setLocalNotes] = useLocalStorage<Note[]>("notes", []);
	const [notes, setNotes] = useState<Note[]>(localNotes);

	// localNotes is fetched from localStorage but being in sync with notes
	useEffect(() => {
		setLocalNotes(notes);
	}, [notes, setLocalNotes]);

	const addNote = (note: Note) => {
		setNotes((prev) => [...prev, note]);
	};

	const updateNote = (updated: Note) => {
		setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
	};

	const deleteNote = (id: string) => {
		setNotes((prev) => prev.filter((n) => n.id !== id));
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<Header />
			<main className="max-w-4xl mx-auto p-4">
				{/* passing an object */}
				<Outlet context={{ notes, addNote, updateNote, deleteNote }} />
			</main>
		</div>
	);
}

export default App;
