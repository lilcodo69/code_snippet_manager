import type { ComponentPropsWithoutRef } from "react";
import { useModalContext } from "./Modal"


interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
}

const Button = ({children,onClick,...props}:ButtonProps)=>{

    return (
        <button onClick={onClick} {...props}>
           {children}
        </button>
    )
}