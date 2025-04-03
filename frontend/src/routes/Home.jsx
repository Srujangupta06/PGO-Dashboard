import HomeHero from "../components/HomeHero";
import { FaCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import UserFeedback from "../components/UserFeedback";
import Faq from "../components/Faq";
const Home = () => {
  return (
    <main className="py-6 md:py-8">
      {/*Hero Section*/}
      <HomeHero />
      {/*Section 2 */}

      {/*Section 3 */}

      {/*User Feedback for using PGO Platform*/}
      {/* <UserFeedback /> */}
      {/*Frequently Asked Questions */}
      {/* <Faq /> */}
      {/*Conatct Section */}
      <section id="contactSection">
        <h1>Conatct Use</h1>
      </section>
    </main>
  );
};

export default Home;
