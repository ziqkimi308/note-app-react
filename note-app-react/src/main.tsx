import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { NotesList } from "./pages/NotesList.tsx";
import { NewNote } from "./pages/NewNote.tsx";
import { EditNoteWrapper } from "./pages/EditNote.tsx";
import { NoteDetail } from "./pages/NoteDetail.tsx";


const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{index: true, element: <NotesList />},
			{path: "new", element: <NewNote />},
			{path: "edit/:id", element: <EditNoteWrapper />},
			{path: "note/:slug", element: <NoteDetail />},
			{path: "note/id/:slug", element: <NoteDetail />}
		]
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
