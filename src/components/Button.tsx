import type { ComponentPropsWithoutRef } from "react";
import React from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  className?: string;

  isIconOnly?: boolean;
}

export const Button = ({  children,  onClick,  className,  isIconOnly,  ...props}: ButtonProps) => {
  const hasOnlyIconChild =
    React.Children.count(children) === 1 &&  React.isValidElement(children) &&
    (children.type === "img" ||  (typeof children.type === "function" &&
        children.type.name.includes("Icon")) ||(typeof children.type === "string" &&  children.type.toLowerCase().includes("svg")));

  const isIconOnlyProp =
    isIconOnly || (hasOnlyIconChild && isIconOnly !== false);

  const paddingStyles = isIconOnlyProp ? "p-2" : "py-2 px-4";

  const baseStyles = `group font-bold rounded flex items-center justify-center gap-2 ${paddingStyles} transition-colors duration-200`;

  return (
  <button  onClick={onClick}  {...props}  className={`${baseStyles} ${className || ""}`}>  
  {children}
    </button>
  );
};
