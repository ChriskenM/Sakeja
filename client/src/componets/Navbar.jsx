import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 mb-6">
      <div className="max-w-6xl mx-auto flex justify-between">
        <Link className="font-bold text-xl" to="/">Sakeja</Link>
        <div className="space-x-4">
          <Link to="/add">Add House</Link>
          <li><Link to="/houses/1">Sample House Details</Link></li>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}
