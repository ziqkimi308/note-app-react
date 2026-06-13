import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { NotesList } from "./pages/NotesList.tsx";
import { NewNote } from "./pages/NewNote.tsx";


const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{index: true, element: <NotesList />},
			{path: "new", element: <NewNote />}
		]
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
