import { data } from 'autoprefixer';
import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../services/auth.service';
import toast from 'react-hot-toast';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const {token, user, login}=useAuth()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    //Post data to server

    try{
      const loginData = await loginUser(data);
      console.log(loginData);
      toast.success("Login Success");
      login(loginData.token,loginData.user);
      navigate("/dashboard/home")
    }catch(error){
      console.log(error);
      toast.error(error.response?.data?.message);
    }finally{
      //loader
    }
  }

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login clicked");
    // Add login logic here
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200 mb-6">
          Login Here
        </h2>
        
        <form action='' onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              {...register(
                "email", 
                {required: 'Email is required', 
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Email must be valid !",
                  }
                })}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 dark:focus:ring-indigo-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              required
            />
            {errors.email && (
              <span className='text-red-600 py-2 block px-2'>{errors.email.message}</span>
              )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is Required !",
                
              })}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 dark:focus:ring-indigo-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              required
            />
               {errors.password && (
                <span className="text-red-400 py-2 block px-2">
                  {errors.password.message}
                </span>
              )}
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              onClick={handleLogin}
              className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none transition-colors"
            >
              Login
            </button>
          </div>
          
          <div className="flex items-center justify-center mt-4">
            <button
              type="reset"
              onClick={handleReset}
              className="w-full px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login