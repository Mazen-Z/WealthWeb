import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-lg text-gray-800 mb-2">
        Sorry, an error has occurred.
      </p>
      <p className="italic text-gray-600 mb-8">
        {error.statusText || error.message}
      </p>
      <img
        src="finn.png"
        alt="Error"
        className="w-32 h-32 mb-4"
      />
      <Link to="/">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Go Back
        </button>
      </Link>
    </div>
  );
}
