import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { signOutUser } from '../api/auth';

export default function SideNav() {
  const [sidebar, setsidebar] = useState(false);

  const showSidebar = () => setsidebar(!sidebar);

  return (
    <div className="side-nav">
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navBar">
          <button
            type="button"
            className="menu-bars nav-btn"
            onClick={showSidebar}
          >
            <span>
              <FaIcons.FaBars />
            </span>
          </button>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <button
                type="button"
                className="menu-close nav-btn"
                onClick={showSidebar}
              >
                <span>
                  <AiIcons.AiOutlineClose /> Close
                </span>
              </button>
            </li>
            <li className="nav-item nav-text">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/"
                onClick={showSidebar}
              >
                <span className="nav-text">
                  <RiIcons.RiHome2Line /> Home
                </span>
              </Link>
            </li>
            <li className="nav-item nav-text">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/income"
                onClick={showSidebar}
              >
                <span className="nav-text">
                  <RiIcons.RiMoneyDollarBoxLine /> Income
                </span>
              </Link>
            </li>
            <li className="nav-item nav-text">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/expenses"
                onClick={showSidebar}
              >
                <span className="nav-text">
                  <RiIcons.RiBriefcase2Line /> Expenses
                </span>
              </Link>
            </li>
            <li className="nav-item nav-text">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/assets"
                onClick={showSidebar}
              >
                <span className="nav-text">
                  <RiIcons.RiLineChartFill /> Assets
                </span>
              </Link>
            </li>
            <li className="nav-item nav-text">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/goals"
                onClick={showSidebar}
              >
                <span className="nav-text">
                  <RiIcons.RiTrophyLine /> Goals
                </span>
              </Link>
            </li>
            <li className="nav-item nav-btn">
              <button
                onClick={signOutUser}
                type="button"
                className="btn sign-out-btn nav-btn"
              >
                <span className="sign-out-text">
                  <RiIcons.RiSendPlaneLine /> Sign Out
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}
