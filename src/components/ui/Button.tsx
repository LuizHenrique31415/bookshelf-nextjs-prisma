import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "back" | "edit" | "delete";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  className = "",
  type = "button",
  variant = "primary",
  disabled = false,
}: ButtonProps) {
  // Mapping of variants to CSS classes
  const variantClassMap = {
    primary: "action-button",
    back: "action-button back-button",
    edit: "action-button edit-button",
    delete: "action-button delete-button",
  };

  const buttonClass = `${variantClassMap[variant]} ${className}`;

  // If there's an href, render as Link
  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {children}
      </Link>
    );
  }

  // Otherwise, render as button
  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
