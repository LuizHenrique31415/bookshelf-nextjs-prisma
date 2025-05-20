import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  padding?: "none" | "small" | "medium" | "large";
}

export default function Card({
  children,
  className = "",
  onClick,
  hover = true,
  padding = "medium",
}: CardProps) {
  const baseStyles = "bg-white rounded-lg shadow-md overflow-hidden";
  const hoverStyles = hover
    ? "transition-transform hover:translate-y-[-5px] hover:shadow-lg"
    : "";

  const paddingStyles = {
    none: "",
    small: "p-2",
    medium: "p-4",
    large: "p-6",
  };

  const cardClasses = `${baseStyles} ${hoverStyles} ${paddingStyles[padding]} ${className}`;

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
}
