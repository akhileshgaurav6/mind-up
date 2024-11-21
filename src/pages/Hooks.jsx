import React, { useReducer, useState } from 'react'
import { Button } from 'flowbite-react';
const Hooks = () => {

    // const [count, setCount] = useState(5);

    function reducer(state, action) {

        if(action.type == "inc" ){
            console.log('reducer logic');
            let newState = state + 2;
            return newState;
        }else if (action.type == "dec"){
            console.log('reducer logic');
            let newState = state - 2;
            return newState;
        }else if (action.type == 'value') {
            return action.payload;
        }
        else {
            return state;
        }
        //logic: [reducer function]
        
    }

    const [count, dispatch] = useReducer(reducer, 6)

  return (
    <div className='p-4 flex flex-col gap-3 bg-gray-900 text-white h-screen'>
        <h1 className='text-center text-4xl'>Welcome to React In built hooks</h1>
        <h1 className='text-center text-5xl mt-5'> {count} times </h1>

        <div className='flex justify-center'>
            <Button color='gray' onClick={()=>{
                dispatch({
                    type: "inc",
                    payload: 90,
                });
            }}>Update Counter</Button>

            <Button color='gray' onClick={()=>{
                dispatch({
                    type: "dec",
                });
            }}>Decrease Counter</Button>

            <Button color='failure' onClick={()=>{
                dispatch({
                    type: "value",
                    payload: 10,
                });
            }}>Reset</Button>
        </div>
    </div>
  )
}

export default Hooks