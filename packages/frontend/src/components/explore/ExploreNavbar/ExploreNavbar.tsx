import Link from 'next/link';
import { useRouter } from 'next/router';

const ExploreNavbar: React.FC = () => {
  const { pathname } = useRouter();

  return (
    <nav>
      <ul className="flex items-center gap-x-4 lg:gap-x-10">
        <li>
          <Link
            className={
              pathname === '/explore/comics' ? 'text-black' : 'text-gray-300'
            }
            href="./comics"
          >
            Comics
          </Link>
        </li>
        <li>
          <Link
            className={
              pathname === '/explore/offers' ? 'text-black' : 'text-gray-300'
            }
            href="./offers"
          >
            Offers
          </Link>
        </li>
        <li>
          <Link
            className={
              pathname === '/explore/collectors'
                ? 'text-black'
                : 'text-gray-300'
            }
            href="./collectors"
          >
            Collectors
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default ExploreNavbar;
