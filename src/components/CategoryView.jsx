import React from 'react'
import { Button } from 'flowbite-react';

const CategoryView = ({ cat }) => {

    const defaultBanner = 'data:image/jpeg;base64,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'
    console.log(cat);
  return (
    <div>
            <div className='shadow-md dark:hover:bg-gray-700 hover:bg-gray-300 cursor-pointer flex  p-5 items-center border  rounded border-gray-600 gap-3 mt-2  w-full'>
                
                <div className='w-full flex flex-col gap-3'>
                <img src={defaultBanner} 
                    className='w-[50px] h-[50px] rounded-full'  alt="" />

                    <h1 className='text-3xl'>{cat.title}</h1>
                    <p className='overflow-auto'>{cat.desc}</p>
                </div>

                <div className='flex flex-col gap-3'>
                    <Button color='red'>Delete</Button>
                    <Button size=''>Edit</Button>
                </div>
              
            </div>
    </div>
  )
}

export default CategoryView