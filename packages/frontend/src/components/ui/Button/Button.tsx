/* eslint-disable react/jsx-props-no-spreading */

import type {
  ButtonHTMLAttributes,
  RefAttributes,
  ForwardRefExoticComponent,
} from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variant style of the component
   * @default 'filled'
   */
  variant?: 'filled' | 'outlined';
  /**
   * Icon for the component
   */
  icon?: React.ReactNode;
}

const styles = {
  base: 'flex items-center justify-center gap-x-2 py-2 px-4 border-2 rounded-lg',
  variant: {
    filled: 'bg-black text-white border-transparent',
    outlined: 'bg-transparent border-current',
  },
  label: 'font-medium leading-normal',
};

export const Button: ForwardRefExoticComponent<
ButtonProps & RefAttributes<HTMLButtonElement>
> = forwardRef(
  (
    {
      children, icon, type = 'button', variant = 'filled', className, ...rest
    },
    ref,
  ) => {
    const buttonClassNames = clsx(
      styles.base,
      styles.variant[variant],
      className,
    );

    return (
      // eslint-disable-next-line react/button-has-type
      <button ref={ref} className={buttonClassNames} type={type} {...rest}>
        <p className={styles.label}>{children}</p>
        {icon}
      </button>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}
