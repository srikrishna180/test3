import logo from "/Logo.png";
import XMark from "./Icons/XMark";
import Bars from "./Icons/Bars";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

// Custom hook to detect clicks outside of a ref element
function useClickAway(
  ref: React.RefObject<HTMLElement>,
  onClickAway: () => void
) {
  const handleClickAway = useCallback(
    (event: MouseEvent) => {
      if (ref?.current && !ref.current.contains(event.target as Node)) {
        onClickAway();
      }
    },
    [ref, onClickAway]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickAway);
    return () => {
      document.removeEventListener("mousedown", handleClickAway);
    };
  }, [handleClickAway]);
}

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: "Smash towing", to: "/smash-towing" },
    { id: 2, text: "Long distance towing", to: "/long-distance-towing" },
    { id: 3, text: "Machinery towing", to: "/machinery-towing" },
    { id: 4, text: "Containers towing", to: "/containers-towing" },
    { id: 5, text: "Private property towing", to: "/private-property-towing" },
    { id: 7, text: "careers", to: "/careers" },
    { id: 8, text: "Owner Operators: Join Us", to: "/join-us" },
  ];

  const { pathname } = useLocation();

  const ref = useRef<HTMLDivElement>(null);

  // Handler function when click away is detected
  const handleClickAway = () => {
    setNav(false);
  };

  // Use the custom hook
  useClickAway(ref, handleClickAway);
  const navigate = useNavigate();

  return (
    <div className="bg-black flex justify-between items-center h-24 px-4 text-white">
      {/* Logo */}
      {/* <h1 className="w-full text-3xl font-bold text-[#00df9a]">REACT.</h1> */}
      <a href="/">
        <img
          className="w-[420px] h-[196px] ml-[-108px]"
          src={logo}
          alt="logo"
        />
      </a>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-12">
        {navItems.map((item, idx) => (
          <a href={item.to} key={`desktop_a_${idx}`}>
            <li
              className={`p-4 hover:bg-gray-800 m-2 cursor-pointer duration-300 ${
                pathname === item.to ? "border-b-2 border-white" : ""
              }`}
              key={`desktop_li_${idx}`}
            >
              {item.text}
            </li>
          </a>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <XMark /> : <Bars />}
      </div>

      {/* Mobile Navigation Menu */}
      <div ref={ref}>
        <ul
          className={
            nav
              ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-50"
              : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%] z-50"
          }
        >
          {/* Mobile Logo */}
          <a href="/" className="text-2xl font-bold">
            <img
              className="w-[250px] h-[156px] ml-[-4rem]"
              src={logo}
              alt="logo"
            />
          </a>

          {/* Mobile Navigation Items */}
          {navItems.map((item, idx) => (
            <li
              key={`mobile_li_${idx}`}
              // border-gray-600 border-b
              className={`p-4 hover:bg-gray-800 duration-300 hover:text-black cursor-pointer `}
              onClick={() => {
                navigate(item.to);
                handleNav();
              }}
            >
              <span
                className={`${
                  pathname === item.to ? "border-b-2 border-white" : ""
                }`}
                // href={item.to}
              >
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
