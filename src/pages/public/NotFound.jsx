import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-red-600">
        404
      </h1>

      <p className="mt-4 text-lg">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-6 rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;