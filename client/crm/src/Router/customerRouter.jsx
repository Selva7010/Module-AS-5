import { createBrowserRouter } from "react-router-dom";
import {SignUp} from "../components/SignUp.jsx";
import { Login } from "../components/Login.jsx";
import CustomerForm from "../components/customerForm.jsx";
import CustomerData from "../components/customerData.jsx";
import UpdateData from "../components/UpdateData.jsx";
import CustomerHomePage from "../components/CustomerHomePage.jsx";



const customer = createBrowserRouter([
  {
    path: "/",
    element: <SignUp/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/HomePage",
    element:<CustomerHomePage/>
  },
  {
    path:"/customerForm",
    element:<CustomerForm/>
  },
  {
    path:"/updateData",
    element:<UpdateData/>
  }
]);

export default customer;
