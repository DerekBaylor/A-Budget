import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { SideNavData } from './componentData/sideNavData';
import { signOutUser } from '../api/auth';

export default function SideNav() {
  const [sidebar, setsidebar] = useState(false);

  const showSidebar = () => setsidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navBar">
          <button type="button" className="menu-bars" onClick={showSidebar}>
            <FaIcons.FaBars />
          </button>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="/budget" className="menu-bars" onClick={showSidebar}>
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
            <li className="nav-item">
              <button
                onClick={signOutUser}
                type="button"
                className="btn sign-out-btn"
              >
                <RiIcons.RiSendPlaneLine />
                <span className="sign-out-text">Sign Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
