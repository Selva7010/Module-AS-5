import React from 'react'
import CustomerForm from "./customerForm.jsx";
import CustomerData from './customerData.jsx';


const CustomerHomePage = () => {
  return (
    <div>
      <nav className="bg-blue-600 p-4 text-white flex justify-center">
            <h5 className="font-bold">Personal Task Manager</h5>
        </nav>
        <CustomerForm/>
        <CustomerData/>
    </div>
  )
}

export default CustomerHomePage

