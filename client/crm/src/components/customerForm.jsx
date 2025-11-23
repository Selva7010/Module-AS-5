// import React, { useState } from 'react';
// import axios from "axios";

// const CustomerForm = () => {
//     const [name, setName]=useState("")
//     const [email, setEmail]=useState("")
//     const [phone, setPhone]=useState("")
//     const[address, setAddress]=useState("")
//     const [customerErr, setCustomerErr] = useState("");
//     const [success, setSuccess] = useState("");

//     const submitHandler=async (e)=>{
//       e.preventDefault()
//       console.log({name, email, phone, address})


//       try {
//       const result = await axios.post(
//         "http://localhost:4000/api/customers",
//         { name, email, phone, address }
//       );

//       if (result.data.success) {
//         setSuccess(result.data.message);
//         setCustomerErr("");
        
//       } 
//       else {
//         setCustomerErr(result.data.message);
//         setSuccess("");
        
        
//       }

//     } catch (err) {
//       console.error(err);
//       setLoginError("Login Failed. Server Error");
//     }

//     }

//     return (
//         <div>
//             {customerErr && (<div className="text-red-600 text-center text-lg mb-3 font-semibold">{customerErr}</div>)}
//            {success && (<div className="text-green-600 text-center text-lg mb-3 font-semibold">{success}</div>)}
//         <form onSubmit={submitHandler} className="bg-white p-4 shadow rounded space-y-2">
//             <input className="w-full border p-2 rounded mt-2" type="text" placeholder="Name" name='name' value={name} onChange={(e) => setName(e.target.value)} />
//             <input className="w-full border p-2 rounded mt-2" type="email" placeholder="Email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
//             <input className="w-full border p-2 rounded mt-2" type="text" placeholder="Phone" name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
//             <input className="w-full border p-2 rounded mt-2" type="text" placeholder="address" name='address' value={address} onChange={(e) => setAddress(e.target.value)} />
//             <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2" type="submit">Add Customer</button>
//         </form>
//         </div>
//     );
// };

// export default CustomerForm;


import React, { useState } from "react";
import axios from "axios";

const CustomerForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [customerErr, setCustomerErr] = useState("");
  const [success, setSuccess] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log({ name, email, phone, address });

    try {
      const result = await axios.post(
        "http://localhost:4000/api/customers",
        { name, email, phone, address }
      );

      if (result.data.success) {
        setSuccess(result.data.message);
        setCustomerErr("");
        // Optional: clear form
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
      } else {
        setCustomerErr(result.data.message);
        setSuccess("");
      }
    } catch (err) {
      console.error(err);
      setCustomerErr("Failed to add customer. Server Error");
      setSuccess("");
    }
  };

  return (
    <div>
      {customerErr && (
        <div className="text-red-600 text-center text-lg mb-3 font-semibold">
          {customerErr}
        </div>
      )}
      {success && (
        <div className="text-green-600 text-center text-lg mb-3 font-semibold">
          {success}
        </div>
      )}
      <form
        onSubmit={submitHandler}
        className="bg-white p-4 shadow rounded space-y-2"
      >
        <input
          className="w-full border p-2 rounded mt-2"
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded mt-2"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded mt-2"
          type="text"
          placeholder="Phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded mt-2"
          type="text"
          placeholder="Address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          type="submit"
        >
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
