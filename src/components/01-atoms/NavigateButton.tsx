import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface NavigateButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  href?: string;
  children: React.ReactNode;
}

export const NavigateButton = ({
  href,
  disabled,
  className,
  children,
  ...props
}: NavigateButton) => {
  return href && !disabled ? (
    <Link href={href} className={cn("w-32 mr-3")}>
      <button
        className={cn(`btn w-full`, className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    </Link>
  ) : (
    <button
      className={cn("btn w-32 mr-3", className)}
      onClick={props.onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
