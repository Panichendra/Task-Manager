import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-purple-500 text-lg p-4  font-bold'>
        <span className='=  w-[50%] text-center'>
         Task Manager
        </span>
      <ul className='flex gap-5 justify-around  font-medium w-[50%] '>
        <li className="hover:text-amber-50 hover:font-bold hover:cursor-pointer hover:transition-all ">Home</li>
        <li className=" hover:text-amber-50 hover:font-bold hover:cursor-pointer hover:transition-all ">Your tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar

