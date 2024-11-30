import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { getAllCategories, deleteCategory as deleteCategoryAPI,
  updateCategory, } from '../../services/category.service'
import CategoryView from '../../components/CategoryView'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form';

const AllCategories = () => {

  const [categories, setCategories] = useState([]);
  const [categoryResponse, setCategoryResponse] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [categoryToUpdate, setCategoryToUpdate] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  //first time execution
  useEffect(() => {
    loadAllCategories()
  }, [])

  async function loadAllCategories() {
    const categoryResponse = await getAllCategories(10)
    console.log(categoryResponse);
    setCategories(categoryResponse.content);
    setCategoryResponse(categoryResponse);
  }

  //set the value to update form
  useEffect(() => {
    if(categoryToUpdate) {
      setValue("title", categoryToUpdate.title);
      setValue("desc", categoryToUpdate.desc);
    }
  }, [categoryToUpdate]);

  const deleteCategory = async (cat) => {
    // delete code
    console.log("deleting category");
   try {
    const result = await deleteCategoryAPI(cat.id);
    console.log(result);
    const newCategories = categories.filter((item) => item.id !== cat.id);
    setCategories(newCategories);
    toast.success("Category Deleted");
   } catch (error) {
    console.log(error);
    console.log("Error in deleting category");
   }
  };

   //function to open modal
   function openEditModal(cat) {
    setOpenModal(true);
    setCategoryToUpdate(cat);
   }

   async function onSubmit() {
    console.log(categoryToUpdate);
    const result = await updateCategory(categoryToUpdate.id, categoryToUpdate)

    const updatedCategories = categories.map((item) => {
      if (item.id == categoryToUpdate.id) {
        return categoryToUpdate;
      }
      return item;
    });

    setCategories(updatedCategories);
    setOpenModal(false);

    toast.success("Category Updated");
   }

  // edit modal function
  function editCategoryModal() {
    return <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          Edit Category : <span> {categoryToUpdate?.title} </span>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
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
               
                // defaultValue={categoryToUpdate?.title}
                {...register(
                  "title", 
                  {required: 'Title is required', 
                    onChange: (e) => {
                      setCategoryToUpdate({
                        ...categoryToUpdate,
                        title: e.target.value
                      })
                    },
                   
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
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                name='desc'
                defaultValue={categoryToUpdate?.desc}
                {...register(
                  "desc", 
                  {required: 'Description is required', 
                    onChange: (e) => {
                      setCategoryToUpdate({
                        ...categoryToUpdate,
                        desc: e.target.value
                      });
                    },
                  
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
              Update Category
            </button>
          </div>
        </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </>
  }



  return (
    <div>
      <Helmet>
        <title>All Categories</title>
      </Helmet>
      <div className='flex justify-center'>
        <Button as={Link} to={'/admin/add-category'} color='blue'>Add Category</Button>
      </div>

      <div className='mt-10'>
       {categories.length > 0 && (
         <h1 className='text-center text-lg font-bold'>
          All Categories : {categories.length}
        </h1>
       )}

       {categories.length <= 0 && <h1 className='text-3xl font-bold text-center'>No Categories is Database</h1>}

        {/* show all categories */}
       <div className='flex flex-col lg:flex-row justify-center gap-4 mt-5 flex-wrap'>
        {categories.map((cat, item) => (
          <CategoryView 
            deleteCategory={deleteCategory} 
            openEditModal={openEditModal}
            cat={cat} 
            key={item} 
          />
          ))}
       </div>
      </div>
      {editCategoryModal()}
    </div>
  )
}

export default AllCategories