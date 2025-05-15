import type React from "react";

type ExclusiveTitle = {
    title: string
    children?: never;
} | {
    title?: never;
    children: React.ReactNode;
}

type ButtonProps = {
    onClick: () => void | Promise<void>;
} & ExclusiveTitle

export const Button = ({onClick, title, children}: ButtonProps) => {
    return (
        <button 
            className={`
                bg-blue-500 
                hover:bg-blue-700 
                text-white 
                font-bold 
                py-2 px-4 
                rounded-full 
                cursor-pointer
            `}
            onClick={onClick}
            >
            {title || children}
        </button>
    )
}