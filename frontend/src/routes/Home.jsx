import HomeHero from "../components/HomeHero";
// import { FaCheck } from "react-icons/fa6";
// import { Link } from "react-router-dom";
// import UserFeedback from "../components/UserFeedback";
// import Faq from "../components/Faq";
import Table from "../ui/Table/Table";
import { useEffect, useState } from "react";
import { backendUrl } from "../utils/utils";
const Home = () => {
  // const [rooms, setRooms] = useState([]);
  // const getRoomData = async () => {
  //   const apiUrl = `${backendUrl}/api/hostel/room/get`;
  //   const response = await fetch(apiUrl, {
  //     method: "GET",
  //     credentials: "include",
  //   });
  //   if (response.ok) {
  //     const data = await response.json();
  //     setRooms(data);
  //   }
  // };

  // useEffect(() => {
  //   getRoomData();
  // }, []);
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
    </main>
  );
};

export default Home;
