import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavigateButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  href?: string;
  text: string;
}

export const NavigateButton = ({
  href,
  text,
  disabled,
  className,
  ...props
}: NavigateButton) => {
  return href && !disabled ? (
    <Link href={href} className={cn("w-32 mr-3")}>
      <button
        className={cn(`btn w-full`, className)}
        disabled={disabled}
        {...props}
      >
        {text}
      </button>
    </Link>
  ) : (
    <button
      className="btn btn-secondary w-32 mr-3"
      onClick={props.onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
