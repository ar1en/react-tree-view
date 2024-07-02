import React from 'react';
import {Icon} from "../index.ts";
import {ToggleProps} from "./interfaces.ts";


export const Toggle: React.FC<ToggleProps> = ({ isExpanded, onClick, level, name, type }) => {
    const l0_1 = <Icon id='model' width="25px" height="25px"/>;
    const l0_2 = <Icon id='model' width="25px" height="25px" color="blue"/>;

    const l1_1 = <Icon id='cube' width="25px" height="25px"/>;
    const l1_2 = <Icon id='cube' width="25px" height="25px" color="blue"/>;

    const l2_1 = <Icon id='view' width="25px" height="25px"/>;
    const l2_2 = <Icon id='view' width="25px" height="25px" color="blue"/>;

    const getIcon = () => {
        if (level === 0) return isExpanded ? l0_2 : l0_1;
        if (level === 1) return isExpanded ? l1_2 : l1_1;
        if (level === 2) return isExpanded ? l2_2 : l2_1;
        return isExpanded ? '+' : '-';
    };

    return (
        <div onClick={(type === "dummy") || (level > 1) ? undefined : onClick}
             className="d-flex align-items-center pointer-event">
            <span className="me-2">{getIcon()}</span>
            {name}
        </div>
    );
};
