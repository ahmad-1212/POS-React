import React from 'react';
import { PiUsersThreeFill } from 'react-icons/pi';
import { MdTableRestaurant } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Settings = () => {
  return (
    <>
      <section className="flex flex-col gap-8 py-10">
        <div className="flex-between flex-wrap gap-3  pb-5">
          <h1 className="text-[2rem] font-[600]">Settings</h1>
        </div>
        <div className="flex gap-10">
          <Link
            to="users"
            className="flex items-center gap-7 rounded-lg p-10 shadow-lg hover:bg-primary-500  hover:text-white"
          >
            <PiUsersThreeFill className="text-6xl" />
            <span className="text-4xl font-semibold uppercase">Users</span>
          </Link>
          <Link
            to="tables"
            className="flex items-center gap-7 rounded-lg p-10 shadow-lg hover:bg-primary-500  hover:text-white"
          >
            <MdTableRestaurant className="text-6xl" />
            <span className="text-4xl font-semibold uppercase">Tables</span>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Settings;
