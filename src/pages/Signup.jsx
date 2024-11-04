import React from 'react'
import { useState } from 'react';
import { useForm } from "react-hook-form"
import { createUser } from '../services/auth.service';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Signup = () => {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async(object) => {
    console.log(object);

    //call backend to create user

    try{
      //actual call to backend
      const userData=await createUser(object)
      console.log(userData);
      toast.success("User is created !!")
      navigate("/login")
    }catch(error){
      //print the error // show error message
      console.log(error);
      toast.error("Error in creating user !!");
    }finally{
      // loader off...
    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("");

  const handleSignUp = () => {
    console.log("Sign Up clicked");
    // Add signup logic here
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setAbout("");
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200 mb-6">
          Create Your Account
        </h2>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Create an account to access our e-learning platform and unlock
            exciting content.
          </p>

        <form action='' className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Name
            </label>
            <input
              {...register("name", {
                required: 'Name is required !!',
                minLength: {
                  value: 5,
                  message: 'mane must be atleast 5 characters long !!'
                }
               })}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 dark:focus:ring-indigo-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              required
            />
             {errors.name && (
              <span className='text-red-600 py-2 block px-2'>{errors.name.message}</span>
              )}
          </div>

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
              Phone Number
            </label>
            <input
             {...register("phoneNumber", {
              required: "Phone number is Required !",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be valid !",
              },
            })}
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 dark:focus:ring-indigo-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              required
            />
            {errors.phoneNumber && (
              <span className='text-red-600 py-2 block px-2'>{errors.phoneNumber.message}</span>
              )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Password
            </label>
            <input
            {...register("password", {
              required: "Password is Required !",
              minLength: {
                value: 5,
                message: "Password must be at least 5 characters long",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  "Password must contain at least one uppercase letter,one lowercase letter,one number and one special character !",
              },
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

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              About
            </label>
            <textarea

            {...register("about", {
                  required: "Write something about yourself !",
                  minLength: {
                    value: 5,
                    message: "Write atleast 5 characters !",
                  },
                })}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 dark:focus:ring-indigo-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              rows="3"
              required
            />
            {errors.about && (
                <span className="text-red-400 py-2 block px-2">
                  {errors.about.message}
                </span>
              )}
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              onClick={handleSignUp}
              className="w-full px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none transition-colors"
            >
              Sign Up
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

export default Signup