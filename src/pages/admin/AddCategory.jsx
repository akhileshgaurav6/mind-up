import React from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form';
import { createCategory } from '../../services/category.service';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //on submit method
  const onSubmit = async (data) => {
    console.log(data);
     //going to call server to create category
     try {
      //server call
      const response = await createCategory(data);
      console.log(response);
      
        toast.success("Category created succesfully");
        navigate('/admin/categories')
     }catch (error) {
      toast.error("Error while creating category");
      console.log(error);
     }
  };

  return (
    <>
      <Helmet>
        <title>Add Category</title>
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Add Category
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-md">
              <span className="p-2 text-gray-500 dark:text-gray-400">
                <i className="fas fa-heading"></i>
              </span>
              <input

                {...register(
                  "title", 
                  {required: 'Title is required', 
                   
                  })}

                type="text"
                id="title"
                placeholder="Enter category title"
                className="flex-1 bg-transparent focus:outline-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 p-2"
              />

                {errors.title && (
                <span className='text-red-600 py-2 block px-2'>{errors.title.message}</span>
                )}
            </div>
          </div>

          {/* Description Field */}
          <div>
            <label
              htmlFor="desc"
              className="block mb-2 text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-md">
              <span className="p-2 text-gray-500 dark:text-gray-400">
                <i className="fas fa-align-left"></i>
              </span>
              <textarea

                {...register(
                  "desc", 
                  {required: 'Description is required', 
                  
                  })}

                id="desc"
                placeholder="Enter category description"
                className="flex-1 bg-transparent focus:outline-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 p-2 h-24 resize-none"
              ></textarea>

                {errors.desc && (
                  <span className='text-red-600 py-2 block px-2'>{errors.desc.message}</span>
                )}

            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default AddCategory