import React, { useCallback, useId, useMemo, useState } from 'react'
import { Button } from 'flowbite-react';
import { memo } from 'react';

const NewChild = memo(function Child( {handleClick} ) {
    console.log('child component rerender');
    return (
        <div className='border p-4 bg-gray-950 text-white'>
            <h1>Hey this is child component</h1>
            <Button color='blue' size='sm' onClick={handleClick}>Child button Click</Button>
        </div>
    );
});

const Performance = () => {
    const [count, setCount] = useState(0);
    const [numbers, setNumbers] = useState([10,40, 30,50]);

    const passId = useId();
    const userNameId = useId()


    let sum = useMemo(() => {
         // expensive task
        console.log('calculating sum');
        let i = 0;
        while(i < 10) i++;
        console.log(numbers);
        const sum = numbers.reduce((acc, value) => acc + value, 0);
        return sum;
    }, [numbers]);

    function increaseCounter() {
        setCount(count+1);
    }

    // function handleClick() {
    //     console.log('button clicked');
    // }

    const handleClick = useCallback(() => {
        console.log('button clicked');
    }, [numbers]);

  return (
    <div className='h-screen flex flex-col gap-3 justify-center items-center'>
        <h1>Example of useMemo hook</h1>
        <h1>Count : {count}</h1>
        <h1>Sum {sum}</h1>
        <Button color='indigo' onClick={increaseCounter}>
            Increase Count
        </Button>

        <NewChild handleClick = {handleClick}/>

        <Button color='pink' onClick={() => {
            setNumbers([...numbers, 49]);
        }}>
            Change Array
        </Button>
        {passId}
        {userNameId}
    </div>
  )
}

export default Performance