import "./App.css";
import { Header } from "./components/Header";
import { NotesList } from "./pages/NotesList";

function App() {
	// type
	type Note = {
		id: string;
		title: string;
		content: string;
		tags: string[];
		views: number;
		featuredImage?: string; 
	};

	// sample datas
	const sampleNotes: Note[] = [
    {
        id: "n-101",
        title: "Understanding React Router v7",
        content: "React Router v7 merges the Remix framework architecture into the standard library. It introduces file-based routing through Vite plugins, but you can still use the standard Data Mode with createBrowserRouter if you prefer to maintain control over your own entry points. This note goes on for quite a while to make sure that the content truncation logic in the NotesList component actually works and slices the text at exactly 140 characters with an ellipsis at the end.",
        tags: ["React", "Routing", "Frontend"],
        views: 1042,
        featuredImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80"
    },
    {
        id: "n-102",
        title: "TypeScript Utility Types",
        content: "Utility types like Partial, Pick, and Omit make working with complex interfaces much easier. Instead of rewriting types, you can derive them dynamically from existing data structures.",
        tags: ["TypeScript", "Fundamentals"],
        views: 856,
    },
    {
        id: "n-103",
        title: "State Management vs. URL State",
        content: "Not everything needs to go into useState. If the data determines what the user sees on a page refresh (like a search query or a tag filter), it should probably go in the URL search parameters instead.",
        tags: ["React", "Architecture", "Best Practices"],
        views: 312,
        featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
    },
    {
        id: "n-104",
        title: "How to useMemo properly",
        content: "useMemo is great for caching expensive calculations, like filtering a massive list of notes or deriving unique tags from an array of objects. Just be careful not to overuse it on primitive values, as the overhead of useMemo itself can sometimes cost more performance than the actual calculation.",
        tags: ["React", "Performance"],
        views: 1290,
    },
    {
        id: "n-105",
        title: "CSS Grid vs. Flexbox",
        content: "A lot of developers default to Flexbox for everything, but CSS Grid is usually better for macro page layouts. Flexbox is 1-dimensional (rows OR columns), while Grid is 2-dimensional (rows AND columns). Once I started using grid-template-columns, my life got a lot easier.",
        tags: ["CSS", "Frontend", "Layout"],
        views: 2405,
        featuredImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80"
    },
    {
        id: "n-106",
        title: "The useEffect Dependency Array",
        content: "If you leave the dependency array empty, the effect runs once. If you omit it entirely, it runs on every render. If you put variables inside, it runs when those variables change. Missing a dependency is the #1 cause of stale state bugs in React applications.",
        tags: ["React", "Hooks", "Best Practices"],
        views: 560,
    },
    {
        id: "n-107",
        title: "Why I switched to Neovim",
        content: "VS Code is great, but it started feeling bloated. I spent a weekend configuring Neovim with Lua, setting up LSP, Telescope, and Treesitter. It was a painful learning curve, but my wrists thank me now because I rarely have to touch the mouse. Plus, it boots up in literally 40 milliseconds.",
        tags: ["Tooling", "Productivity", "Opinion"],
        views: 4021,
        featuredImage: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80"
    },
    {
        id: "n-108",
        title: "Introduction to GraphQL",
        content: "REST APIs usually suffer from over-fetching or under-fetching. GraphQL solves this by allowing the client to request exactly the fields they need in a single endpoint. However, setting up the resolvers and schema on the backend can be quite a bit of boilerplate.",
        tags: ["API", "Backend", "Architecture"],
        views: 890,
    },
    {
        id: "n-109",
        title: "Vim Motions Cheatsheet",
        content: "W jumps forward by word, B jumps backward. CIW changes the word you are currently hovering over. DDP swaps the current line with the one below it. Once you commit these to muscle memory, editing text feels like playing a video game.",
        tags: ["Tooling", "Cheatsheet", "Productivity"],
        views: 154,
    },
    {
        id: "n-110",
        title: "Deploying Vite Apps to Vercel",
        content: "If you are building a pure client-side SPA with Vite and React Router, Vercel makes it incredibly easy. Just link your GitHub repository, set the build command to 'npm run build', and make sure your output directory is set to 'dist'. Vercel handles the global CDN distribution automatically.",
        tags: ["Deployment", "Frontend", "CI/CD"],
        views: 673,
        featuredImage: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80"
    }
];

	const handleDelete = ({id}) => {
		console.log("Delete triggered for ID:", id);
	};

	// ENDS HERE

	return (
		<>
			<Header />
			<NotesList notes={sampleNotes} onDelete={() => handleDelete(5)} />
		</>
	);
}

export default App;
