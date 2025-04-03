import { Link, useNavigate } from "react-router-dom";

const HomeHero = () => {
  const navigate = useNavigate();
  return (
    <section className="px-6 md:px-32 w-full mb-6 sm:mb-12 sm:py-0 min-h-[80vh]">
      <div className="flex flex-col gap-y-8 w-1/2">
        <h1 className="text-3xl font-semibold">
          Manage Your Hostel <br/> 
        </h1>
        
        <p className="text-md italic">
          "Effortlessly manage your hostel listings, update vacancies, and ensure
          a seamless experience  owners"
        </p>
       
        <div className="flex items-center gap-x-4 gap-y-4 flex-wrap">
          <button
            className="bg-blue-500 text-sm text-white px-4 py-1.5 rounded"
            onClick={() => navigate("/auth/login")}
          >
            Register
          </button>
          <Link
            to="/about"
            className="border border-blue-500 text-sm text-blue-500 px-4 py-1.5 rounded"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
