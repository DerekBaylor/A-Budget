// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
// import { IconContext } from 'react-icons';
// import { SideNavData } from './componentData/sideNavData';
import React from 'react';

export default function SideNav() {
  // const [sidebar, setsidebar] = useState(false);

  // const showSidebar = () => setsidebar(!sidebar);

  return (
    <>
      {/* <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navBar">
          <button type="button" className="menu-bars" onClick={showSidebar}>
            <FaIcons.FaBars />
          </button>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="/" className="menu-bars" onClick={showSidebar}>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SideNavData.map((item) => (
              <li className={item.cName}>
                <Link to={item.path} onClick={showSidebar} aria-current="page">
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider> */}
      <div className="sidenav">
        <a href="/">Home </a>
        <a href="/budget"> budget</a>
        <a href="/income"> income</a>
      </div>
    </>
  );
}
