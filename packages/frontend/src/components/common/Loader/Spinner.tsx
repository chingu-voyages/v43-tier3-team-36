/* eslint-disable react/jsx-props-no-spreading */
import type { SVGAttributes } from 'react';

type Props = {
  svgProps?: SVGAttributes<SVGSVGElement>;
};

const Spinner: React.FC<Props> = ({ svgProps }) => (
  <svg fill="none" viewBox="0 0 66 66" {...svgProps}>
    <circle
      className="text-transparent"
      cx="33"
      cy="33"
      fill="none"
      r="28"
      stroke="currentColor"
      strokeWidth={4}
    />
    <circle
      className="text-blue-500 animate-[loading-spin_1.4s_linear_infinite]"
      cx="33"
      cy="33"
      fill="none"
      r="28"
      stroke="currentColor"
      strokeDasharray="1, 174"
      strokeDashoffset="306"
      strokeLinecap="round"
      strokeWidth={4}
    />
  </svg>
);

export default Spinner;
