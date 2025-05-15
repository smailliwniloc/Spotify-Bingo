import type React from "react"

type StepWrapperProps = {
    children: React.ReactNode
}

export const StepWrapper = ({children}: StepWrapperProps) => {
    return (<div className="rounded bg-gray-500 w-full flex flex-col justify-center items-center">{children}</div>)
}