'use client';
import './page.css';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export default function Home() {
  return (
    <>
      <main className="container border border-blue-200 h-screen w-full">
        {/* header */}
        <header className='h-16  flex align-center shadow-gray-500/10 shadow-md justify-between w-full p-4 dark:shadow-gray-500/30 border dark:border-gray-600'>
          <span className='my-auto'><ThemeSwitcher /></span>
          <p className='font-medium text-lg hover:underline my-auto'>Your Expenses</p>
          <button className="Btn my-auto">

            <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>

            <div className="text">Logout</div>
          </button>
        </header>

        {/* Total Expense Viewer */}
        <div className='flex flex-col border-b-4 border-gray-200 dark:border-gray-600  h-38 w-full mx-auto '>
          <div className='text-xs w-full text-center mx-auto pb-4 italic tracking-widest'> <span className='text-xl text-red-500'>" </span>Track Your Money: Take Charge of Your Finances <span className='text-xl text-red-500'>" </span></div>
          <div className='flex justify-center align-center'>
            <span className='text-2xl text-red-600  mb-14 my-auto'>Rs. </span>
            <div className='text-7xl font-bold  p-4'>550</div>
          </div>
          <span className='py-4 text-center align-center tracking-widest text-gray-500'>12 April, 2024</span>
        </div>

        {/* List of the expenses */}
        <div className='shadow-gray-500/10 shadow-xl text-base shadow-md text-gray-500 dark:text-gray-400 flex justify-evenly px-6 py-4  '>
          <span>This Month's total </span>
          <div> <span className='text-red-500'> Rs. </span>5000</div>
        </div>
        <div className='flex flex-col gap-4 w-full h-2/4 overflow-y-scroll '>
          <li className='mt-4 text-gray-700 flex justify-between border-b border-gray-300 px-8 py-4 dark:text-gray-300 dark:border-gray-700'>
            <div className='font-bold text-base'> <span className='text-xl mr-2'> 🍔 </span>  Education</div>
            <div className='text-lg'>- <span className='text-red-500 dark:text-red-500'>Rs. </span>3000</div>
          </li>
          <li className='text-gray-700 flex justify-between border-b border-gray-300 px-8 py-4 dark:text-gray-300 dark:border-gray-700'>
            <div className='font-bold text-base'> <span className='text-xl mr-2'> 🍔 </span>  Education</div>
            <div className='text-lg'>- <span className='text-red-500 dark:text-red-500'>Rs. </span>3000</div>
          </li>
          <li className='text-gray-700 flex justify-between border-b border-gray-300 px-8 py-4 dark:text-gray-300 dark:border-gray-700'>
            <div className='font-bold text-base'> <span className='text-xl mr-2'> 🍔 </span>  Education</div>
            <div className='text-lg'>- <span className='text-red-500 dark:text-red-500'>Rs. </span>3000</div>
          </li>
          <li className='text-gray-700 flex justify-between border-b border-gray-300 px-8 py-4 dark:text-gray-300 dark:border-gray-700'>
            <div className='font-bold text-base'> <span className='text-xl mr-2'> 🍔 </span>  Education</div>
            <div className='text-lg'>- <span className='text-red-500 dark:text-red-500'>Rs. </span>3000</div>
          </li>
          <li className='text-gray-700 flex justify-between border-b border-gray-300 px-8 py-4 dark:text-gray-300 dark:border-gray-700'>
            <div className='font-bold text-base'> <span className='text-xl mr-2'> 🍔 </span>  Education</div>
            <div className='text-lg'>- <span className='text-red-500 dark:text-red-500'>Rs. </span>3000</div>
          </li>
          <li className='text-gray-700 flex justify-between border-b border-gray-300 px-8 py-4 dark:text-gray-300 dark:border-gray-700'>
            <div className='font-bold text-base'> <span className='text-xl mr-2'> 🍔 </span>  Education</div>
            <div className='text-lg'>- <span className='text-red-500 dark:text-red-500'>Rs. </span>3000</div>
          </li>
        </div>


        {/* footer section */}
        <footer className='z-50 h-1/12 bg-white dark:bg-darkColor flex border border-gray-300 dark:border-gray-600 p-4 justify-around absolute left-0 bottom-0 w-full'>
          <div className='bg-orange-200  p-2 my-auto rounded-full dark:bg-orange-400'>
            <Image src={'/bar-chart.png'} width={25} height={25} alt='analytics'></Image>
          </div>
          <button className="button my-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20" fill="none" className="svg-icon"><g stroke-width="1.5" stroke-linecap="round" stroke="#de8a2a"><circle r="7.5" cy="10" cx="10"></circle><path d="m9.99998 7.5v5"></path><path d="m7.5 9.99998h5"></path></g></svg>
            <span className="lable">Add</span>
          </button>
          <div className='bg-orange-200 p-2 my-auto rounded-full  dark:bg-orange-400'>
            <Image src={'/user.png'} width={25} height={25} alt='user'></Image>
          </div>
        </footer>
      </main>
    </>
  );
}
