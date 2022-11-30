import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import ProjectsPage from './pages/projectsPage/ProjectsPage';
import ProjectPage from './pages/projectPage/ProjectPage';
import store from "./redux/store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProjectsPage />,
    },
    {
        path: "projects/:id",
        element: <Provider store={store}><ProjectPage /></Provider>,
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