import {useState} from "react";
import {Tree, TopMenu, Sidebar} from "./shared/ui-kit";
import {someDataService} from "./entities";
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <TopMenu toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={sidebarOpen}>
                <div className='p-2'>
                    <Tree type={"servers"}
                          getInitialData={someDataService.fetchNode}
                          getChildren={someDataService.getChildren}/>
                </div>
            </Sidebar>
        </>
    )
}

export default App