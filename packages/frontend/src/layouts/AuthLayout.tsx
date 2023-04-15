/* eslint-disable react/jsx-props-no-spreading */
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useChannel, useEvent } from '@harelpls/use-pusher';
import {
  Menu, Bell, Bookmark, ArrowRight, ArrowLeft, X,
} from 'lucide-react';

import { Avatar } from '@/components/ui';
import { SEO, type SEOProps } from './SEO';
import AlertPopup from '@/components/common/AlertPopup/AlertPopup';
import useAlertStore from '@/store/store';
import { getUserNotifications, patchUserNotifications } from '@/api';

const PROFILE_AVATAR_FALLBACK = 'https://placekeanu.com/250/g';

type NavigationProps = {
  onShowNotifications: () => void;
};

const Navigation: React.FC<NavigationProps> = ({ onShowNotifications }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <header className="flex items-center px-2 py-4 border gap-x-2">
      <Menu className="sm:hidden" onClick={() => setShowModal(true)} />
      <div className="flex items-center justify-between grow">
        <h1>Marvel Collector</h1>
        <nav className="sm:grow sm:flex sm:items-center">
          {/* Conditional rendering of nav menu for smaller devices */}
          {showModal ? (
            <div className="absolute top-0 left-0 z-50 w-screen h-screen bg-white">
              <ul className="flex flex-col px-8 gap-y-8 py-14">
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

          <div className="hidden grow sm:block">
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

          <div className="flex items-center gap-x-4">
            <Bell className="cursor-pointer" onClick={onShowNotifications} />
            {/* TODO: Add saved bookmarks functionality */}
            <Bookmark />
            {/* TODO: Add user profile functionality */}
            <Avatar
              src={PROFILE_AVATAR_FALLBACK}
              alt="Keanu Reeves"
              size={30}
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

type NotificationsProps = {
  onClose: () => void;
};

const Notifications: React.FC<NotificationsProps> = ({ onClose }) => {
  const setAlert = useAlertStore((state) => state.setAlert);
  const { data: notificationsData } = useQuery(['user-notifications'], {
    queryFn: getUserNotifications,
    onError: (err: Error) => {
      setAlert({
        type: 'error',
        message: err.message,
      });
    },
  });
  const updateNotificationMutation = useMutation({
    mutationFn: patchUserNotifications,
    onError: (err: Error) => {
      setAlert({ type: 'error', message: err.message });
    },
  });
  const UnreadNotifications = useMemo(
    () => (notificationsData ? notificationsData.filter((n) => !n.isRead) : []),
    [notificationsData],
  );

  return (
    <>
      <div className="fixed top-0 left-0 z-30 w-screen h-screen bg-black bg-opacity-20" />
      <aside className="fixed top-0 right-0 z-40 w-screen h-screen overflow-auto bg-white sm:max-w-md">
        <button
          className="absolute top-3 right-4"
          type="button"
          onClick={onClose}
        >
          <ArrowLeft />
        </button>
        <header className="flex items-center h-20 gap-2 ml-8">
          <h2 className="text-xl font-bold">Notifications</h2>
          <div className="w-5 h-6 font-bold text-center text-white bg-red-500 rounded-md">
            {UnreadNotifications.length}
          </div>
        </header>
        <div className="border border-neutral-200" />
        <div className="px-12 py-4 md:px-4 h-2/3 sm:h-3/4">
          <button
            className="block text-sm border-none text-end hover:underline text-neutral-600"
            type="button"
            onClick={() => {
              UnreadNotifications.map((n) => updateNotificationMutation.mutate(n.id));
            }}
          >
            Clear all
          </button>
          <ul className="grid max-h-full p-4 overflow-auto auto-rows-auto gap-y-5 mt-7">
            {UnreadNotifications.map(({ id, message }) => (
              <li
                key={id}
                className="grid grid-cols-[max-content_minmax(0,1fr)_min-content] items-center px-3 pt-3 pb-3 border rounded-lg gap-x-4 border-neutral-200"
              >
                <Avatar src={PROFILE_AVATAR_FALLBACK} alt="" />
                <p className="text-sm grow max-w-[65ch]">{message}</p>
                <button
                  type="button"
                  onClick={() => updateNotificationMutation.mutate(id)}
                >
                  <X />
                </button>
              </li>
            ))}
          </ul>
          {UnreadNotifications.length === 0 ? (
            <p className="text-center">You have no new notifications...</p>
          ) : null}
        </div>
      </aside>
    </>
  );
};

type LayoutProps = {
  children: React.ReactNode;
  seo: SEOProps;
};

const AuthLayout: React.FC<LayoutProps> = ({ children, seo }) => {
  const queryClient = useQueryClient();
  const setAlert = useAlertStore((state) => state.setAlert);
  // NOTE: Type for User from @marvel-collector/types
  // is quite misleading...
  const currentUserChannel = useChannel(
    // @ts-ignore
    queryClient.getQueryData(['user'])?.userId ?? undefined,
  );
  useEvent(currentUserChannel, 'trade-request', (data: any) => {
    if (typeof data === 'object' && data?.message) {
      setAlert({
        type: 'info',
        message: data.message,
      });
    }
  });
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <SEO {...seo} />
      <div className="h-full min-h-screen">
        <AlertPopup />
        <Navigation onShowNotifications={() => setShowNotifications(true)} />
        {showNotifications && (
          <Notifications onClose={() => setShowNotifications(false)} />
        )}
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
