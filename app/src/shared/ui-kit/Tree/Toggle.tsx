import React from 'react';
import {Icon} from "../index.ts";
import {ToggleProps} from "./interfaces.ts";

export const Toggle: React.FC<ToggleProps> = ({ isExpanded, onClick, level, name, type }) => {
    const serverIcon = <Icon id='model' width="25px" height="25px" color="blue"/>
    const cubeIcon = <Icon id='cube' width="25px" height="25px" color="blue"/>;
    const viewIcon = <Icon id='view' width="25px" height="25px" color="blue"/>;
    const expandIcon = <Icon id='expand' width="25px" height="25px"/>;
    const collapseIcon = <Icon id='collapse' width="25px" height="25px" color="blue"/>;
    const dummyIcon = <Icon id='dummy' width="25px" height="25px"/>;

    const getActionIcon = () => {
        if (type === "dummy" || level > 1) return dummyIcon;
        return isExpanded ? collapseIcon : expandIcon;
    };

    const getTypeIcon = () => {
        switch (type){
            case 'server':
                return serverIcon;
            case 'cube':
                return cubeIcon;
            case 'view':
                return viewIcon;
        }
    }

    return (
        <div onClick={(type === "dummy") || (level > 1) ? undefined : onClick}
             className="d-flex align-items-center pointer-event">
            <span className="me-2">{getActionIcon()} {getTypeIcon()}</span>
            {name}
        </div>
    );
};
