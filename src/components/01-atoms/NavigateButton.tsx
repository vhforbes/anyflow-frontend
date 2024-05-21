import Link from "next/link";

export const NavigateButton = ({
  onClick,
  href,
  text,
  disabled,
}: {
  onClick?: () => void;
  href?: string;
  text: string;
  disabled?: boolean;
}) => {
  return href && !disabled ? (
    <Link href={href} className="w-32 mr-3">
      <button className="btn btn-secondary w-full" disabled={disabled}>
        {text}
      </button>
    </Link>
  ) : (
    <button
      className="btn btn-secondary w-32 mr-3"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
