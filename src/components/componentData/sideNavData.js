import React from 'react';
import * as RiIcons from 'react-icons/ri';

// eslint-disable-next-line import/prefer-default-export
export const SideNavData = [
  {
    title: 'Home',
    path: '/',
    icon: <RiIcons.RiHome2Line />,
    cName: 'nav-text',
  },
  {
    title: 'Budget',
    path: '/budget',
    icon: <RiIcons.RiFileListLine />,
    cName: 'nav-text',
  },
  {
    title: 'Income',
    path: '/income',
    icon: <RiIcons.RiMoneyDollarBoxLine />,
    cName: 'nav-text',
  },
  {
    title: 'Liabilities',
    path: '/liabilities',
    icon: <RiIcons.RiBriefcaseLine />,
    cName: 'nav-text',
  },
  {
    title: 'Assets',
    path: '/assets',
    icon: <RiIcons.RiLineChartFill />,
    cName: 'nav-text',
  },
  {
    title: 'Goals',
    path: '/goals',
    icon: <RiIcons.RiTrophyLine />,
    cName: 'nav-text',
  },
];
