import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';

export type IllustrationProps = {
  source: StaticImageData;
  altText: string;
  className?: string;
  priority?: boolean;
};

const Illustration: React.FC<IllustrationProps> = ({
  source,
  altText,
  className,
  priority,
}) => (
  <article
    className={clsx(
      'p-4 flex item-center justify-center bg-black rounded-2xl',
      className,
    )}
  >
    <div className="max-w-[400px]">
      <Image
        className="max-w-full"
        src={source}
        alt={altText}
        priority={priority}
      />
    </div>
  </article>
);

export default Illustration;
