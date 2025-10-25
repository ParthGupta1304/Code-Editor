import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="pt-16 pb-24 sm:pt-20 sm:pb-28">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="block text-slate-800">Code faster with</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-slate-600">
                a clean online editor
              </span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-600">
              Write, run, and share code right in your browser. Lightweight,
              fast, and styled with Tailwind.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                to="/editor"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-white font-medium shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Open Editor
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center rounded-md border border-slate-300 px-6 py-3 text-slate-700 font-medium hover:bg-slate-50"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* Feature cards */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-slate-800 font-semibold">
                Blue & Slate design
              </h3>
              <p className="mt-2 text-slate-600 text-sm">
                A calm palette based on blue, gray, and slate for a professional
                look.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-slate-800 font-semibold">
                Responsive by default
              </h3>
              <p className="mt-2 text-slate-600 text-sm">
                Looks great on mobile and desktop with minimal effort.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-slate-800 font-semibold">Fast and simple</h3>
              <p className="mt-2 text-slate-600 text-sm">
                Jump straight into coding without heavy setup.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
