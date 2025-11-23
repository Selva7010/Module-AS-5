import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

export const SignUp = () => {
    const navigate=useNavigate()

    const [name, setName]= useState("")
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const [registerError, setRegisterError]= useState("")
    const [success, setSuccess]= useState("")
    

    const handleSubmit = async(e) =>{
        e.preventDefault()

        try {
      const result = await axios.post(
        "http://localhost:4000/api/auth/register",
        { name, email, password }
      );
      
      if(result.data.success){
        setSuccess(result.data.message)
        setRegisterError("")
        
        navigate("/login")
      }
      else{
        setRegisterError(result.data.message)
        setSuccess("")
      }
      
    } catch (err) {
      console.error(err);
      alert("Registration Failed");
    }
        
    }

  return (
    <div className='flex justify-center h-screen bg-blue-400'>
        <div className="signup m-auto rounded-2xl w-90 bg-white">
           <h2 className='text-center text-2xl text-green-700 font-bold mt-3'>SignUp</h2>

           {registerError && (<div className="text-red-600 text-center text-lg mb-3 font-semibold">{registerError}</div>)}
           {success && (<div className="text-green-600 text-center text-lg mb-3 font-semibold">{success}</div>)}

            <div className="form p-7">
                <form onSubmit={handleSubmit}>
                    <div className="name">
                        <label htmlFor="">Name:</label><br />
                        <input className='border w-full p-2 mt-1 mb-3 rounded' type="text" name='name' onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="email">
                        <label htmlFor="">Email:</label><br />
                        <input className='border w-full p-2 mt-1 mb-3 rounded' type="email" name='email' onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="password">
                        <label htmlFor="">Password:</label><br />
                        <input className='border w-full p-2 mt-1 mb-3 rounded' type="password" name='password' onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className="button flex justify-center mb-3 mt-2">
                        <button className='bg-green-600 px-5 py-2 text-white font-semibold rounded cursor-pointer'>Register</button>
                    </div>
                </form>
                <div className="login flex justify-evenly items-center">
                    <p>You have already Account?</p>
                    <a href="/login" className='text-blue-800 text-lg font-semibold'>Login</a>
                </div>
            </div>
        </div>
    </div>
  )
}
