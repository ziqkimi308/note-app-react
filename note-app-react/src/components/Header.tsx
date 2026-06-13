import { Link } from "react-router"

export const Header: React.FC = () => {
	return (
		<header className="bg-white shadow">
			<div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
				<Link to="/" className="text-2xl text-blue-600 font-bold">React Notes App</Link>
				{/* space-x-3 adds left margin to every child except first one */}
				<nav className="space-x-3">
					<Link to="/" className="text-blue-600">Notes</Link>
					<Link to="/new" className="text-blue-600">New</Link>
				</nav>
			</div>
		</header>
	);
}