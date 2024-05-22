import Link from "next/link";

export const NavigateButton = ({
  href,
  text,
  disabled,
}: {
  href: string;
  text: string;
  disabled?: boolean;
}) => {
  return (
    <Link href={href} className="w-32 mr-3">
      <button className="btn btn-secondary w-full" disabled={disabled}>
        {text}
      </button>
    </Link>
  );
};
