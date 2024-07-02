import React, {SVGProps} from "react";
import sprites from "./sprite.svg";

interface IconProps extends SVGProps<SVGSVGElement> {
    id: string;
}

export const Icon: React.FC = ({id, ...props}:IconProps) => {
    return (
        <svg {...props} aria-hidden='true'>
            <use href={`${sprites}#${id}`}></use>
        </svg>
    )
};