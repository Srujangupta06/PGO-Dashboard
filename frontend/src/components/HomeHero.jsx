import { Link, useNavigate } from "react-router-dom";

const HomeHero = () => {
  const navigate = useNavigate();
  return (
    <section className="px-6 md:px-32 w-full py-20 md:py-28 min-h-[80vh] flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col gap-y-6 items-center text-center max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-semibold text-blue-500 leading-tight">
          Tired of Hostel Hassles? Let Tech Take Over 🧠⚡
        </h1>
        <p className="text-lg text-gray-600">
          Say goodbye to boring spreadsheets and messy records
        </p>
        <p className="text-md md:text-lg text-gray-600 max-w-xl ">
          No more hostel headaches. Just smooth control.
        </p>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <button
            className="cursor-pointer bg-blue-500 text-sm text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={() => navigate("/auth/login")}
          >
            Get Started
          </button>
          <Link
            to="/about"
            className="border border-blue-500 text-sm text-blue-500 px-6 py-2 rounded hover:border-blue-600 hover:text-blue-600 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
