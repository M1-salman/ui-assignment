'use client';

import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import TuneIcon from '@mui/icons-material/Tune';
import AppsIcon from '@mui/icons-material/Apps';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';

import Image from 'next/image';
import MenuList from './components/MenuList';
import { useState } from 'react';
import ManageActionFlow from './components/ManageActionFlow';

const menuItems1 = [
  {
    id: 1,
    icon: HomeIcon,
    text: 'Dashboard',
  },
  {
    id: 2,
    icon: AppsIcon,
    text: 'Services',
  },
  {
    id: 3,
    icon: TuneIcon,
    text: 'Configurations',
  },
  {
    id: 4,
    icon: PersonIcon,
    text: 'Members',
  },
];

const menuItems2 = [
  {
    id: 5,
    icon: CalendarTodayIcon,
    text: 'Notification handler',
  },
  {
    id: 6,
    icon: AccountTreeIcon,
    text: 'Action flow',
  },
  {
    id: 7,
    icon: WorkspacesIcon,
    text: 'Groups',
  },
  {
    id: 8,
    icon: LibraryBooksIcon,
    text: 'Templates',
  },
  {
    id: 9,
    icon: PeopleIcon,
    text: 'Customers',
  },
  {
    id: 10,
    icon: AccessTimeIcon,
    text: 'Logs',
  },
];

const Playground = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<number | null>(6);
  return (
    <div className="flex min-h-screen">
      <div className="w-[13.75rem] border-r bg-[#FAFAFA] border-[#DEDEDE] ">
        <div className="flex justify-between items-center h-16 mx-4">
          <Image src={'/dokaai_Logo.png'} width={31.04} height={26.88} alt="dokaai_Logo" />
          <KeyboardDoubleArrowLeftIcon color="action" />
        </div>
        <div className="flex items-center justify-between h-14 mx-4">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-9 h-9 rounded-md mr-2 bg-[#B3325D] text-white font-medium">
              <span>AB</span>
            </div>
            <span className="text-[0.875rem] text-[#1F1F1F] font-semibold">Project name</span>
          </div>
          <KeyboardArrowDownIcon />
        </div>
        <MenuList
          menuItems={menuItems1}
          selectedId={selectedMenuItem}
          onItemClick={setSelectedMenuItem}
        />
        <div className="flex items-center h-14 px-5">
          <span className="mr-2 text-[0.75rem] text-[#727272] font-semibold">NOTIFICATION</span>
          <div className="w-full border border-[#DEDEDE]"></div>
        </div>
        <MenuList
          menuItems={menuItems2}
          selectedId={selectedMenuItem}
          onItemClick={setSelectedMenuItem}
        />
        <div className="flex  items-center h-14 mt-40">
          <div className="flex  justify-center items-center w-9 h-9 rounded-md text-[#FFFFFF] bg-[#B3325D] mx-4">
            <LanguageIcon />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Google</span>
            <span className="text-xs text-[#727272] font-medium">2443454454</span>
          </div>
        </div>
      </div>
      <ManageActionFlow />
    </div>
  );
};

export default Playground;
