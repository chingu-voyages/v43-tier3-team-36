/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import Link from 'next/link';
import {
  Menu, Bell, Bookmark, ArrowRight,
} from 'lucide-react';

import { Avatar } from '@/components/ui';
import { SEO, type SEOProps } from './SEO';
import AlertPopup from '@/components/common/AlertPopup/AlertPopup';

import { logout } from '@/api';

type LayoutProps = {
  children: React.ReactNode;
  seo: SEOProps;
};

const Navigation: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogout(!showLogout);
  };

  return (
    <>
      <header className="flex items-center gap-x-2 py-4 px-3 border relative">
        <Menu className="sm:hidden" onClick={() => setShowModal(true)} />
        <div className="grow flex items-center justify-between">
          <h1>Marvel Collector</h1>

          <nav className="sm:grow sm:flex sm:items-center">
            {/* Conditional rendering of nav menu for smaller devices */}
            {showModal ? (
              <div className="absolute top-0 left-0 z-50 w-screen h-screen bg-white">
                <ul className="flex flex-col gap-y-8 py-14 px-8">
                  <li>
                    <Link href="/explore">Explore</Link>
                  </li>
                  <li>
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link href="/trades">Trades</Link>
                  </li>
                  <li>
                    <Link href="/forums">Forums</Link>
                  </li>
                </ul>
                <ArrowRight
                  className="absolute top-4 right-6"
                  onClick={() => setShowModal(false)}
                />
              </div>
            ) : null}

            <div className="grow hidden sm:block">
              <ul className="flex items-center justify-center gap-x-8">
                <li>
                  <Link href="/explore">Explore</Link>
                </li>
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <Link href="/forums">Forums</Link>
                </li>
              </ul>
            </div>
            <div className="">
              <div className="flex items-center gap-x-4 cursor-pointer">
                {/* TODO: Add notification functionality */}
                <Bell />
                {/* TODO: Add saved bookmarks functionality */}
                <Bookmark />
                {/* TODO: Add user profile functionality */}
                <Avatar
                  src="https://placekeanu.com/250/g"
                  alt="Keanu Reeves"
                  size={30}
                  onClick={() => setShowLogout(!showLogout)}
                />
              </div>
            </div>
          </nav>
        </div>
      </header>
      {showLogout && (
        <div className="bg-black rounded-md text-white absolute w-28 top-20 px-2 py-1 md:top-14 right-3">
          <Link href="/login" className="text-base" onClick={handleLogout}>
            Logout
          </Link>
          <div>
            <Link
              href="/edit-profile"
              className="text-base"
              onClick={() => setShowLogout(!showLogout)}
            >
              Edit Profile
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

const AuthLayout: React.FC<LayoutProps> = ({ children, seo }) => (
  <>
    <SEO {...seo} />
    <div className="h-full min-h-screen">
      <AlertPopup />
      <Navigation />
      {children}
    </div>
  </>
);

export default AuthLayout;
