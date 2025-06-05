import { Link } from "react-router-dom"
import {motion} from "framer-motion"
import { useState } from "react"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="p-1 bg-gradient-to-br from-blue-50 to-blue-200 drop-shadow-2xl top-0 sticky z-50">
      <div className="flex justify-between items-center">
        {/* Logo and Name on the left */}
        <div className="flex items-center">
          <Link to="/">
            <img src="/Images/logos/KKR_LOGO-nobg.png" alt="KKR Logo" className="h-20 w-20 rounded-full mr-2 md:mr-3 inline-block align-middle" />
          </Link>
          <motion.h1 
            className="hidden sm:block text-base md:text-2xl font-bold text-black"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 , ease: "easeInOut"}}
          >
            Kalyan Karnataka
            <p className="text-center"> Tourism</p>
          </motion.h1>
        </div>
        {/* Hamburger for mobile */}
        <button className="sm:hidden p-2 focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="block w-6 h-0.5 bg-black mb-1"></span>
          <span className="block w-6 h-0.5 bg-black mb-1"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </button>
        {/* Desktop Menu */}
        <ul className="hidden sm:flex space-x-3 md:space-x-6 justify-end font-bold p-2 md:p-3 items-center">
          <li className="relative group">
            <Link to="/" className="relative inline-block text-black ">
              <span className="relative">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 group-hover:w-full group-hover:bg-black transition-all duration-300"></span>
              </span>
            </Link>
          </li>
          <li className="relative group">
            <Link to="/places" className="relative inline-block text-black ">
              <span className="relative">
                KKR Region
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 group-hover:w-full group-hover:bg-black transition-all duration-300"></span>
              </span>
            </Link>
          </li>
          <li className="relative group">
            <Link to="/gallery" className="relative inline-block text-black ">
              <span className="relative">
                Gallery
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 group-hover:w-full group-hover:bg-black transition-all duration-300"></span>
              </span>
            </Link>
          </li>
          <li className="relative group">
            <Link to="/events" className="relative inline-block text-black">
              <span className="relative">
                Events
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 group-hover:w-full group-hover:bg-black transition-all duration-300"></span>
              </span>
            </Link>
          </li>
          <li className="relative group">
            <Link to="/hotels" className="relative inline-block text-black">
              <span className="relative">
                Accommadation
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 group-hover:w-full group-hover:bg-black transition-all duration-300"></span>
              </span>
            </Link>
          </li>
          <li className="relative group">
            <Link to="/itinerary" className="relative inline-block text-black ">
              <span className="relative">
                Itinerary
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 group-hover:w-full group-hover:bg-black transition-all duration-300"></span>
              </span>
            </Link>
          </li>
          <li className="relative group">
            <Link to="/blog" className="relative inline-block text-black">
              <span className="relative">
                Blogs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 group-hover:w-full group-hover:bg-black transition-all duration-300"></span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="sm:hidden flex flex-col space-y-2 font-bold p-2 bg-white rounded shadow mt-2">
          <li><Link to="/" className="block py-2 px-4 text-black" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/places" className="block py-2 px-4 text-black" onClick={() => setMenuOpen(false)}>KKR Region</Link></li>
          <li><Link to="/gallery" className="block py-2 px-4 text-black" onClick={() => setMenuOpen(false)}>Gallery</Link></li>
          <li><Link to="/events" className="block py-2 px-4 text-black" onClick={() => setMenuOpen(false)}>Events</Link></li>
          <li><Link to="/hotels" className="block py-2 px-4 text-black" onClick={() => setMenuOpen(false)}>Accommadation</Link></li>
          <li><Link to="/itinerary" className="block py-2 px-4 text-black" onClick={() => setMenuOpen(false)}>Itinerary</Link></li>
          <li><Link to="/blog" className="block py-2 px-4 text-black" onClick={() => setMenuOpen(false)}>Blogs</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;


