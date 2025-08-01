// components/LogoNexus.tsx
import React from "react";

type LogoNexusProps = {
  width?: number | string;
  height?: number | string;
  className?: string;
  title?: string;
};

export default function LogoNexus({
  width = 64, // Increased default width
  height = 32, // Increased default height for a wider logo
  className = "",
  title = "Nexus Logo",
}: LogoNexusProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={title}
      role="img"
      className={className}
      style={{ display: "block", margin: 0, padding: 0 }} // Remove extra blank space
    >
      <title>{title}</title>
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.62 16.5587H20.6219V20.3712C20.6219 22.0736 21.7318 23.1766 23.4321 23.2006H25.6047C26.5494 23.2246 27.1397 23.8 27.1397 24.7352C27.1634 25.9101 27.1634 27.109 27.1634 28.284C27.187 29.0752 26.5966 29.7466 25.7937 29.7706H25.6756C24.4712 29.7946 23.2905 29.7946 22.0861 29.7706C21.3068 29.7946 20.6455 29.1711 20.6219 28.3799V28.26V25.8382C20.5983 24.2077 19.5829 23.1526 17.9534 23.1526H10.3257C8.01138 23.1766 6.5 21.642 6.5 19.3161V12.6262C6.5 12.4842 6.506 12.3449 6.51781 12.2086V11.5149C6.54143 10.0283 5.36066 8.82939 3.89652 8.80541H1.53499C0.566766 8.78143 0 8.22994 0 7.24683V3.74603C0 2.7869 0.566766 2.21143 1.53499 2.21143H4.95921C5.95105 2.21143 6.51781 2.7869 6.51781 3.77V5.97599C6.51781 7.79833 7.50965 8.80541 9.30441 8.80541H16.9085C19.1284 8.80541 20.62 10.34 20.62 12.6179V16.5587Z"
          fill="#0098C5"
        />
        <path
          d="M9 14.5C9 12.8431 10.3431 11.5 12 11.5H15C16.6569 11.5 18 12.8431 18 14.5V17.5C18 19.1569 16.6569 20.5 15 20.5H12C10.3431 20.5 9 19.1569 9 17.5V14.5Z"
          fill="#114E85"
        />
      </g>
    </svg>
  );
}
