/* eslint-disable import/extensions */
import Image from 'next/image';
import { AlignJustify, X } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Logo from '@/assets/logo.svg';
import { Button } from '@/components/ui';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="flex items-center justify-between py-4 px-4 border-b">
      <article>
        <Image src={Logo} alt="app logo" />
      </article>
      <nav>
        <Button
          className="md:hidden p-0 bg-white"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <span className="sr-only">menu</span>
          <AlignJustify className="text-textgray" />
        </Button>
        <div
          className={clsx(
            'flex-col gap-4 items-center md:block w-full h-full fixed md:static top-0 left-0 bottom-0 bg-white md:bg-transparent',
            {
              flex: isOpen,
              hidden: !isOpen,
            },
          )}
        >
          <div className="md:hidden self-end">
            <Button
              className="bg-white"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <span className="sr-only">menu close</span>
              <X className="text-textgray" />
            </Button>
          </div>
          <ul className="flex flex-col gap-6 md:gap-4 md:flex-row">
            <li>
              <Link href="/explore">
                <Button className="text-black text-sm border border-black bg-white rounded-full">
                  Explore
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <Button className="text-sm rounded-full">Trade now</Button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </section>
  );
};

export default Nav;
