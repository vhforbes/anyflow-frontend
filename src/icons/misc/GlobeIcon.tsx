const GlobeIcon = ({ className }: { className?: string }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M1.5 9H16.5M1.5 9C1.5 13.1421 4.85786 16.5 9 16.5M1.5 9C1.5 4.85786 4.85786 1.5 9 1.5M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5M16.5 9C16.5 4.85786 13.1421 1.5 9 1.5M9 1.5C10.876 3.55376 11.9421 6.21903 12 9C11.9421 11.781 10.876 14.4462 9 16.5M9 1.5C7.12404 3.55376 6.05794 6.21903 6 9C6.05794 11.781 7.12404 14.4462 9 16.5"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default GlobeIcon;
