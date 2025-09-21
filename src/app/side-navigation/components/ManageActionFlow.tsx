'use client';

import { Search } from '@/cuteui/components/searchbar';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

const actionList = [
  {
    id: 1,
    actionName: 'Notification for influencers',
  },
  {
    id: 2,
    actionName: 'Influencer Engagement',
  },
  {
    id: 3,
    actionName: 'Notification Notification System',
  },
  {
    id: 4,
    actionName: 'Influencer Outreach Notification',
  },
  {
    id: 5,
    actionName: 'Influencer Collaboration Reminder',
  },
];

const ManageActionFlow = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="w-full">
      <div className="flex items-center justify-between h-16 border-b border-[#F0F0F0] px-6">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 rounded-md mr-2 bg-[#E2F3EF]">
            <AccountTreeIcon />
          </div>
          <span className="font-semibold">Action flow</span>
        </div>
        <div className="flex items-center">
          <NotificationsNoneIcon />
          <Image
            src={'/profile-Image.png'}
            width={32}
            height={32}
            alt="profile image"
            className="rounded-full ml-8"
          />
        </div>
      </div>
      <div className="flex items-center justify-between h-24 px-6">
        <Search
          placeholderText="Search flow"
          className="w-80 bg-[#FAFAFA]"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <Link
          href={'/action-flow'}
          className="flex items-center justify-center w-10 h-10 border border-[#389F7F] rounded-md text-lg text-[#389F7F]"
        >
          <span>+</span>
        </Link>
      </div>
      <div className="flex items-center justify-between h-9 mx-8 pl-4 pr-14">
        <span>Action flow name</span>
        <span>Action</span>
      </div>
      {actionList.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between h-12 border-b border-[#DEDEDE] mx-8 mt-2 pl-4 pr-16"
        >
          <span className="inline-block w-56 font-medium">{item.actionName}</span>
          <span className="inline-block w-56">
            This flow deals specifically churn users and all their impacts.
          </span>
          <BorderColorIcon className="text-[#389F7F]" />
        </div>
      ))}
    </div>
  );
};

export default ManageActionFlow;
