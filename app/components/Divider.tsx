import React from "react";

interface DividerProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  color?: string;
}

/**
 * Simple horizontal divider matching the provided SVG.
 */
export default function Divider({
  width = 200,
  height = 26,
  color = "#2D3E4E",
  className,
  ...rest
}: DividerProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <rect x="12" y="12.8408" width="180" height="1" fill={color} />
    </svg>
  );
}
