import Link from "next/link";
import React from "react";

export const NavigateButton = ({
  onClick,
  href,
  // text,
  disabled,
  primary = false,
  children,
}: {
  className?: string;
  onClick?: () => void;
  href?: string;
  // text: string;
  disabled?: boolean;
  primary?: boolean;
  children: React.ReactNode;
}) => {
  return href && !disabled ? (
    <Link href={href} className="w-32 mr-3">
      <button
        className={`btn ${primary ? "bg-brand-6" : "btn-secondary"} w-full`}
        disabled={disabled}
      >
        {children}
      </button>
    </Link>
  ) : (
    <button
      className={`btn w-32 mr-3 ${primary ? "bg-brand-6" : "btn-secondary"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
