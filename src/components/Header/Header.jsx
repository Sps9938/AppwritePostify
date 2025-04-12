import React from "react";
import {Container, Logo, LogoutBtn} from '../index';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

function Header() {
   const authStatus = useSelector((state) => state.auth.status)
   const navigate = useNavigate();

   const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },


  ]

    return (
<header className="bg-white shadow-md sticky top-0 z-50">
<Container>
<nav className="flex items-center justify-between py-4">
    
    {/* Logo Section */}
    <Link to="/" className="flex items-center gap-2">
    <Logo width="40px" />
    <span className="text-xl font-bold text-gray-800 tracking-wide">Post<span className="text-yellow-500">Plus</span></span>
    </Link>

    {/* Navigation Links */}
    <ul className="flex items-center space-x-4">
{navItems.map((item) =>
    item.active ? (
    <li key={item.name}>
        <button
        onClick={() => navigate(item.slug)}
        className="px-4 py-2 text-gray-700 hover:text-white hover:bg-yellow-500 transition-all duration-200 rounded-full text-sm font-medium"
        >
        {item.name}
        </button>
    </li>
    ) : null
    )}

    {authStatus && (
        <li>
        <LogoutBtn />
        </li>
    )}
    </ul>
</nav>
</Container>
</header>


    )
}

export default Header