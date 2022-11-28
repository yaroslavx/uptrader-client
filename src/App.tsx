import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import ProjectsPage from './pages/projectsPage/ProjectsPage';
import ProjectPage from './pages/projectPage/ProjectPage';

const router = createBrowserRouter([
    {
        path: "projects",
        element: <ProjectsPage />,
    },
    {
        path: "projects/:id",
        element: <ProjectPage />,
    },
]);

const App = () => {
    return (
        <div className="app">
            <RouterProvider router={router} />
        </div>
    )
}

export default App