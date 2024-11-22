import React, { useEffect, useState } from 'react'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { getAllCategories } from '../../services/category.service'
import CategoryView from '../../components/CategoryView'

const AllCategories = () => {

  const [categories, setCategories] = useState([]);
  const [categoryResponse, setCategoryResponse] = useState(null);

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

  return (
    <div>
      <Helmet>
        <title>All Categories</title>
      </Helmet>
      <div className='flex justify-center'>
        <Button as={Link} to={'/admin/add-category'} color='blue'>Add Category</Button>
      </div>

      <div className='mt-10'>
        <h1 className='text-center text-4xl'>All Categories : {categoryResponse?.totalElements}</h1>
        {/* show all categories */}
       <div className='flex flex-col lg:flex-row justify-center gap-3 mt-5 flex-wrap'>
        {categories.map((cat, item) => (
          <CategoryView cat={cat} key={item} />
          ))}
       </div>
      </div>
    </div>
  )
}

export default AllCategories