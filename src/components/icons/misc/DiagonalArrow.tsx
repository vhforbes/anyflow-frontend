const DiagonalArrow = ({ className }: { className?: string }) => (
  <svg
    width="26"
    height="25"
    viewBox="0 0 26 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <line
      x1="0.919944"
      y1="24.2724"
      x2="25.3139"
      y2="1.27242"
      stroke="white"
      strokeWidth="2"
    />
    <line x1="25" y1="25" x2="25" y2="2.00001" stroke="white" strokeWidth="2" />
    <line
      x1="1.60596"
      y1="1"
      x2="25.9999"
      y2="1"
      stroke="white"
      strokeWidth="2"
    />
  </svg>
);

export default DiagonalArrow;
