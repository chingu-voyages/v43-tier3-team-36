import React from 'react';

type LabelColor = `bg-${string}-${string}`;

export type TLabelProps = {
  title: string;
  /**
   * Tailwind color
   * Example bg-emerald-800
   */
  color?: LabelColor;
  large?: boolean;
};

export const Label = ({ title, large, color = 'bg-red-500' }: TLabelProps) => (
  <span
    className={`${color} font-semibold rounded-full ${
      large ? 'text-sm' : 'text-xs'
    }  px-2 py-1 text-white`}
  >
    {title}
  </span>
);
