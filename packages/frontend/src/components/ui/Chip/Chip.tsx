/* eslint-disable react/jsx-props-no-spreading */
import type { ForwardRefExoticComponent, HTMLAttributes } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Label for the component
   */
  label: string;
  /**
   * Whether to make component size larger
   * @default false
   */
  large?: boolean;
}

const styles = {
  base: 'font-semibold rounded-full px-2 py-1 text-white bg-red-500',
};

export const Chip: ForwardRefExoticComponent<
ChipProps & React.RefAttributes<HTMLSpanElement>
> = forwardRef(({
  label, large = false, className, ...rest
}, ref) => {
  const spanClassNames = clsx(
    styles.base,
    large ? 'text-md' : 'text-sm',
    className,
  );

  return (
    <span ref={ref} className={spanClassNames} {...rest}>
      {label}
    </span>
  );
});
