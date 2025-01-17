import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./Components/Auth/userAuth";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import PlanForum from "./Components/Admin/PlanForum";
import Users from "./Components/Admin/index";
import Plans from "./Pages/Plans";
import Upload from "./Components/uploadFile/uploadFile";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./Pages/userDashBoard";

// Define the router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/upload",
    element: (
        <Upload />
    ),
  },

  {
    path: "/Plan",
    element: <PlanForum />,
  },
  {
    path: "/Users",
    element: <Users />,
  },
  {
    path: "/Plans",
    element: <Plans />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/user/:id",
    element: <Dashboard/>,
  },
  {
    path: "/admin",
    element:( <ProtectedRoute>
      <Admin />,
    </ProtectedRoute>
    )
  },
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
