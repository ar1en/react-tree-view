import {useState} from "react";
import {Tree, TreeNode, TopMenu, Sidebar} from "./shared/ui-kit";
import 'bootstrap/dist/css/bootstrap.min.css'

import servers from './shared/ui-kit/Tree/data/servers.json';

const App = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    const serversData: TreeNode[] = servers.value;

    return (
        <>
            <TopMenu toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen}>
                <div className='p-2'>
                    <Tree data={serversData}/>
                </div>
            </Sidebar>
        </>
    )
}

export default App