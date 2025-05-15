import React from "react";
import type { IconBaseProps } from "react-icons";
import { FaRegCircleCheck as FinishedIcon, FaRegCircle as ToDoIcon, FaRegCircleDot as InProgressIcon } from "react-icons/fa6";

const Divider = () => {
    return (
        <div className="flex-grow border-b-4 border-solid border-black"/>    
    )
}

type WorkflowTimelineProps = {
    step: number;
    setStep: React.Dispatch<React.SetStateAction<number>>;
    size: number;
}

export const WorkflowTimeline = ({step, setStep, size}: WorkflowTimelineProps) => {

    const iterator = React.useMemo(() => Array(size).fill(0), [size]);

    const IndexToIcon = React.useCallback(({index, ...rest}: {index: number} & IconBaseProps) => {
        const Icon = () => {
            if (index < step) {
                return <FinishedIcon color="green" {...rest}/>
            }
            if (index === step) {
                return <InProgressIcon color="goldenrod" {...rest}/>
            }
            return <ToDoIcon color="black" {...rest}/>
        }

        return (
            <>
                <Icon/>
                {index !== size - 1 ? <Divider/> : null}
            </>
        )
    }, [step, size])

    return (
        <div className="w-full flex justify-center">
            <div className="w-1/2 flex justify-around items-center">
                {iterator.map((_value, index) => (
                    <IndexToIcon 
                        index={index} 
                        onClick={() => setStep(index)}
                        size={50}
                        className="cursor-pointer"
                    />
                ))
                }
            </div>
        </div>
    )
}