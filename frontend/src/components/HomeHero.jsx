import { Link, useNavigate } from "react-router-dom";

const HomeHero = () => {
  const navigate = useNavigate();
  return (
    <section className="px-6 md:px-32 w-full py-20 md:py-28 min-h-[90vh] flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col gap-y-6 items-center text-center max-w-3xl">
      <h1 className="text-xl md:text-2xl font-semibold text-blue-500 leading-relaxed">
  Tired of Hostel Hassles? <span className="text-2xl md:text-3xl">Let Tech Take Over 🧠⚡</span>
</h1>
        
        <p className="text-md md:text-lg text-gray-600 max-w-xl font-semibold italic" >
          No more hostel headaches. Just smooth control.
        </p>
        <p className="text-lg text-gray-600">
          Say goodbye to boring <span className="font-medium line-through">spreadsheets and messy records</span>
        </p>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <button
            className="cursor-pointer  bg-radial from-blue-400 via-blue-500 to-blue-600 text-sm text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
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
