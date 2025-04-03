import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./routes/ProtectedRoute";
import { lazy } from "react";

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));
const Dashboard = lazy(() => import("./routes/Dashboard"));
const PageNotFound = lazy(() => import("./routes/PageNotFound"));
const Login = lazy(() => import("./routes/Login"));
const Registration = lazy(() => import("./routes/Registration"));

const App = () => {
  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Registration />} />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
              <About />
              <Footer />
            </>
          }
        />
       
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
