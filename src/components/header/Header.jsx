import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const Header = () => {
  const location = useLocation();
  return (
    <header className="bg-[#046d8b] text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl sm:text-3xl font-bold">
          NY Times Most Popular Articles
        </h1>
        <nav>
          <Link
            to="/"
            className={`header-link ${
              location.pathname === "/" ? "active-link" : ""
            }`}
          >
            All Articles
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
