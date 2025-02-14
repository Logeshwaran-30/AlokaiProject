import React from 'react'
const Emptycart = () => {
  return (
   
         <div>
      
        <div className="flex flex-col justify-start items-center min-h-screen mt-14">
          <img
            className="w-[100px] h-[100px] sm:w-[300px] sm:h-[300px] border rounded-md border-neutral-200"
            width="300"
            height="300"
            src="../emptycart.svg" 
            alt="emptycart"
          />
          <div>
            <h1 className="font-bold text-3xl mt-6 sm:mt-8 text-center">Your Cart is Empty.</h1>
          </div>
        </div>
      
    </div>
    )
}

export default Emptycart;