import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MessagePage from "../components/MessagePage";
import AuthLayout from "../pages";
import CheckEmail from "../pages/CheckEmail";
import CheckPassword from "../pages/CheckPassword";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import RegisterPage from "../pages/RegisterPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "register",
                element: <AuthLayout><RegisterPage /></AuthLayout>
            },
            {
                path: "email",
                element: <AuthLayout><CheckEmail /></AuthLayout>
            },
            {
                path: "password",
                element: <AuthLayout><CheckPassword /></AuthLayout>,
            },
            {
                path: "forgot-password",
                element: <AuthLayout><ForgotPassword /></AuthLayout>,
            },
            {
                path: "",
                element: <Home />,
                children: [
                    {
                        path: ":userId",
                        element: <MessagePage />,
                    },
                ],
            },
        ],
    },
]);

export default router;
