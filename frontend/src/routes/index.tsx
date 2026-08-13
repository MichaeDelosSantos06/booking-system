import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../page/LoginPage";
import RegistrationPage from "../page/RegistrationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/regis",
    element: <RegistrationPage />,
  },
]);
