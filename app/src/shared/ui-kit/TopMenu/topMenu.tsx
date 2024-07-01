import React from 'react';
import { Navbar, Button } from 'react-bootstrap';

export const TopMenu: React.FC = ({toggleSidebar}) => {

    return (
        <Navbar className="p-2 justify-content-between" bg="light" expand="lg">
            <Navbar.Brand>Tree View</Navbar.Brand>
            <Button variant="outline-primary" onClick={toggleSidebar}>
                Открыть
            </Button>
        </Navbar>
    );
};
