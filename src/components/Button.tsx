import type { ComponentPropsWithoutRef } from "react";


interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
}

export const Button = ({children,onClick,...props}:ButtonProps)=>{

    return (
        <button onClick={onClick} {...props}>
           {children}
        </button>
    )
}