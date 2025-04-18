import { Link } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import { IoMdCall, IoIosMail } from "react-icons/io";
import { FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-600 text-white py-4  px-6 sm:px-32">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-x-8">
        <div className="flex gap-x-4  h-fit items-center">
          {/* <h2 className="text-xl font-semibold">Paying Guest Online</h2> */}
          <img
            src="https://www.gtands.com/static/media/logo.b577779c31c6d4b7ee27.jpeg"
            alt="PG Logo"
            className="h-12 w-12 rounded-full border-2 border-white shadow-md"
          />
          <p className="mt-2 text-gray-400 text-sm">
            One shot Visualization Platform to manage your hostel
          </p>
        </div>

        <div>
          <h3 className="text-md font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-gray-400">
            <li className="text-sm">
              <Link to="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li className="text-sm">
              <Link to="/contact-us" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li className="text-sm">
              <Link to="/contact-us" className="hover:text-white">
                Refund Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2">Contact Us</h3>

          <Link
            to="tel:+919876543210"
            className="text-gray-400 hover:text-white flex items-center gap-x-2 mb-2"
          >
            <IoMdCall className="text-xl" />
            <span className="text-sm">Call Now: +91 xxxxx xxxxx</span>
          </Link>

          <Link
            className="text-gray-400 hover:text-white flex items-center gap-x-2 mb-2"
            to="https://mail.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoIosMail className="text-xl" />
            <span className="text-sm">Email: xyz@example.com</span>
          </Link>
        </div>
      </div>

      <div className="mt-6 text-center">
        <h3 className="text-md font-semibold">Follow Us</h3>
        <div className="flex justify-center mt-3 space-x-4 gap-x-2">
          <Link
            to="https://www.facebook.com/login/"
            target="_blank"
            className="text-gray-400 hover:text-white"
          >
            <FaFacebook className="text-xl" />
          </Link>
          <Link
            to="https://x.com/i/flow/login"
            target="_blank"
            className="text-gray-400 hover:text-white"
          >
            <AiFillTwitterCircle className="text-2xl" />
          </Link>
          <Link
            to="https://www.instagram.com/accounts/login/?hl=en"
            target="_blank"
            className="text-gray-400 hover:text-white"
          >
            <AiFillInstagram className="text-2xl" />
          </Link>
        </div>
      </div>
      <hr className="my-4 border-gray-600"/>
      <div className="mt-4 text-center text-gray-400 cursor-pointer hover:text-white">
        <span className="text-sm">
          &copy; 2025 PGO Hostel. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
