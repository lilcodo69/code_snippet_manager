import type { ComponentPropsWithoutRef } from "react";


interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
  className:string;
}


export const Button = ({children,onClick,className,...props}:ButtonProps)=>{
  const baseStyles = "font-bold py-2 px-4 rounded";

    return (
        <button onClick={onClick} {...props} className={`${baseStyles} ${className}`}>
           {children}
        </button>
    )
}