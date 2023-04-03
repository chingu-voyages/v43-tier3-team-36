import clsx from 'clsx';
// eslint-disable-next-line import/no-extraneous-dependencies
import { twMerge } from 'tailwind-merge';

import Spinner from './Spinner';

type Props = {
  label?: string;
  className?: string;
};

const Loader: React.FC<Props> = ({ label, className }) => (
  <div
    className={twMerge(
      clsx(
        'absolute top-1/2 left-1/2 h-48 -translate-x-1/2 -translate-y-1/2',
        {
          'flex flex-col gap-y-8 items-center justify-center top-[45%] ': label,
        },
        className,
      ),
    )}
  >
    {label && <h1>{label}</h1>}
    <Spinner svgProps={{ width: 64, height: 64 }} />
  </div>
);

export default Loader;
