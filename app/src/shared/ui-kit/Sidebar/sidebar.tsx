import React, { ReactNode } from 'react';
import styles from './sidebar.module.css';

interface SidebarProps {
    isOpen: boolean;
    children?: ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, children }) => {
    return (
        <div className={`z-n1 ${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            {children}
        </div>
    );
};
