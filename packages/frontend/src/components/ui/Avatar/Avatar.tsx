/* eslint-disable react/jsx-props-no-spreading */
import type { RefAttributes, ForwardRefExoticComponent } from 'react';
import { forwardRef, useState } from 'react';
import clsx from 'clsx';
import stc from 'string-to-color';
import Image, { type ImageProps } from 'next/image';

export interface AvatarProps extends ImageProps {
  /**
   * Size of the component (width/height)
   */
  size?: number;
}

const styles = {
  base: 'rounded-full',
  image: 'object-cover rounded-[inherit]',
  fallback: 'text-black flex justify-center items-center rounded-[inherit]',
};

export const Avatar: ForwardRefExoticComponent<
AvatarProps & RefAttributes<HTMLImageElement>
> = forwardRef(({
  size = 40, alt, className, ...rest
}, ref) => {
  const [isLoadError, setIsLoadError] = useState(false);

  const containerClassNames = clsx(styles.base, className);

  return (
    <div className={containerClassNames}>
      <Image
        ref={ref}
        width={size}
        height={size}
        alt={alt}
        className={isLoadError ? styles.fallback : styles.image}
        style={{ backgroundColor: isLoadError ? stc(alt) : 'initial' }}
        onError={() => setIsLoadError(true)}
        {...rest}
      />
    </div>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Avatar.displayName = 'Avatar';
}
