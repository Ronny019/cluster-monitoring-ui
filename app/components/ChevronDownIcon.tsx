import React from "react";

interface ChevronDownIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // width & height in px
  color?: string;
  title?: string;
}

/**
 * Simple downward chevron/arrow icon.
 */
const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({
  size = 18,
  color = "#F3F4F4",
  title = "Expand",
  className,
  ...rest
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label={title}
    role="img"
    className={className}
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    <path
      d="M8.49381 10.9875L6.11256 8.6063C5.87506 8.3688 5.81881 8.09692 5.94381 7.79067C6.06881 7.48442 6.30006 7.3313 6.63756 7.3313H11.4001C11.7251 7.3313 11.9501 7.48442 12.0751 7.79067C12.2001 8.09692 12.1438 8.3688 11.9063 8.6063L9.52506 10.9875C9.45006 11.0625 9.36881 11.1157 9.28131 11.1469C9.19381 11.1782 9.10631 11.1938 9.01881 11.1938C8.90631 11.1938 8.80943 11.1782 8.72818 11.1469C8.64693 11.1157 8.56881 11.0625 8.49381 10.9875Z"
      fill={color}
    />
  </svg>
);

export default ChevronDownIcon;
