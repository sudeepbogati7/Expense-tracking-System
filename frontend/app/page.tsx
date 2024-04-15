'use client';

import './page.css';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import Link from 'next/link';
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import 'tailwindcss/tailwind.css';

// components
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';


export default function Home() {


  const useAuthentication = () => {
    const router = useRouter();

    useEffect(() => {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
      if (!token) {
        router.push('/register');
      }
    }, []);

    return null; // You can return any value or component here if needed
  };



  useAuthentication();
  // date
  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toDateString(); // You can customize the format as needed
  };

  // pop up for adding new expense
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // side bar for user Info
  function toggleSideBar() {
    setOpen(!open)
  }
  const togglePopup = () => {
    setIsPopupOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="container h-screen w-full">
        {/* header */}
        <Header />

        {/* Total Expense Viewer */}
        <div className='flex flex-col border-b-4 border-gray-200 dark:border-gray-600  h-38 w-full mx-auto '>
          <div className='text-xs w-4/5  text-center mx-auto pb-4 italic tracking-widest'> <span className='text-xl text-orange-500'>" </span>Track Your Money: Take Charge of Your Finances <span className='text-xl text-orange-500'>" </span></div>
          <div className='flex justify-center align-center'>
            <span className='text-2xl text-orange-600  mb-14 my-auto'>Rs. </span>
            <div className='text-7xl font-bold  p-4'>550</div>
          </div>
          <span className='py-4 text-center align-center tracking-widest text-gray-500'>{getCurrentDate()}</span>
        </div>

        {/* List of the expenses */}
        <div className='shadow-gray-500/10 shadow-xl text-base shadow-md text-gray-500 dark:text-gray-400 flex justify-evenly px-6 py-4  '>
          <span>This Month's total </span>
          <div className='border-b-2 border-gray-400 dark:border-gray-500'> <span className='text-orange-500'> Rs. </span>5000</div>
        </div>
        <div className='flex flex-col gap-4 w-full h-2/4 overflow-y-scroll '>
          <li className='mt-4 text-gray-700 flex justify-between border-b border-gray-300 px-8 py-4 dark:text-gray-300 dark:border-gray-700'>
            <div className='font-bold text-base'> <span className='text-xl mr-2'> 🍔 </span>  Education</div>
            <div className='text-lg'>- <span className='text-red-500 dark:text-orange-500'>Rs. </span>3000</div>
          </li>
          <li className='mt-4 text-gray-700 flex justify-between border-b border-gray-300 px-8 py-4 dark:text-gray-300 dark:border-gray-700'>
            <div className='font-bold text-base'> <span className='text-xl mr-2'> 🍔 </span>  Education</div>
            <div className='text-lg'>- <span className='text-red-500 dark:text-orange-500'>Rs. </span>3000</div>
          </li>
          <li className='mt-4 text-gray-700 flex justify-between border-b border-gray-300 px-8 py-4 dark:text-gray-300 dark:border-gray-700'>
            <div className='font-bold text-base'> <span className='text-xl mr-2'> 🍔 </span>  Education</div>
            <div className='text-lg'>- <span className='text-red-500 dark:text-orange-500'>Rs. </span>3000</div>
          </li>
          <li className='mt-4 text-gray-700 flex justify-between border-b border-gray-300 px-8 py-4 dark:text-gray-300 dark:border-gray-700'>
            <div className='font-bold text-base'> <span className='text-xl mr-2'> 🍔 </span>  Education</div>
            <div className='text-lg'>- <span className='text-red-500 dark:text-orange-500'>Rs. </span>3000</div>
          </li>
          <li className='mt-4 text-gray-700 flex justify-between border-b border-gray-300 px-8 py-4 dark:text-gray-300 dark:border-gray-700'>
            <div className='font-bold text-base'> <span className='text-xl mr-2'> 🍔 </span>  Education</div>
            <div className='text-lg'>- <span className='text-red-500 dark:text-orange-500'>Rs. </span>3000</div>
          </li>
          <li className='mt-4 text-gray-700 flex justify-between border-b border-gray-300 px-8 py-4 dark:text-gray-300 dark:border-gray-700'>
            <div className='font-bold text-base'> <span className='text-xl mr-2'> 🍔 </span>  Education</div>
            <div className='text-lg'>- <span className='text-red-500 dark:text-orange-500'>Rs. </span>3000</div>
          </li>
          <li className='mt-4 text-gray-700 flex justify-between border-b border-gray-300 px-8 py-4 dark:text-gray-300 dark:border-gray-700'>
            <div className='font-bold text-base'> <span className='text-xl mr-2'> 🍔 </span>  Education</div>
            <div className='text-lg'>- <span className='text-red-500 dark:text-orange-500'>Rs. </span>3000</div>
          </li>
          <li className='mt-4 text-gray-700 flex justify-between border-b border-gray-300 px-8 py-4 dark:text-gray-300 dark:border-gray-700'>
            <div className='font-bold text-base'> <span className='text-xl mr-2'> 🍔 </span>  Education</div>
            <div className='text-lg'>- <span className='text-red-500 dark:text-orange-500'>Rs. </span>3000</div>
          </li>
          <li className='mt-4 text-gray-700 flex justify-between border-b border-gray-300 px-8 py-4 dark:text-gray-300 dark:border-gray-700'>
            <div className='font-bold text-base'> <span className='text-xl mr-2'> 🍔 </span>  Education</div>
            <div className='text-lg'>- <span className='text-red-500 dark:text-orange-500'>Rs. </span>3000</div>
          </li>
          <li className='mt-4 text-gray-700 flex justify-between border-b border-gray-300 px-8 py-4 dark:text-gray-300 dark:border-gray-700'>
            <div className='font-bold text-base'> <span className='text-xl mr-2'> 🍔 </span>  Education</div>
            <div className='text-lg'>- <span className='text-red-500 dark:text-orange-500'>Rs. </span>3000</div>
          </li>
          <li className='mt-4 text-gray-700 flex justify-between border-b border-gray-300 px-8 py-4 dark:text-gray-300 dark:border-gray-700'>
            <div className='font-bold text-base'> <span className='text-xl mr-2'> 🍔 </span>  Education</div>
            <div className='text-lg'>- <span className='text-red-500 dark:text-orange-500'>Rs. </span>3000</div>
          </li>
        </div>

        <AddPopUp isOpen={isPopupOpen} onClose={togglePopup} />
        {/* footer section */}
        <footer className='h-1/12 bg-white dark:bg-darkColor flex border border-gray-300 dark:border-gray-600 p-4 justify-around absolute left-0 bottom-0 w-full'>
          <Link href={'/dashboard'} className='bg-orange-200 active:bg-orange-700 duration-200 transition-all p-2 my-auto rounded-full dark:bg-orange-400'>
            <Image src={'/bar-chart.png'} width={25} height={25} alt='analytics'></Image>
          </Link>
          <button
            className="button my-auto"
            onClick={togglePopup}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20" fill="none" className="svg-icon"><g stroke-width="1.5" stroke-linecap="round" stroke="#de8a2a"><circle r="7.5" cy="10" cx="10"></circle><path d="m9.99998 7.5v5"></path><path d="m7.5 9.99998h5"></path></g></svg>
            <span className="lable">Add</span>
          </button>
          <SideBar open={open} setOpen={setOpen} />
          <button
            onClick={toggleSideBar}
            className='bg-orange-200 p-2 my-auto rounded-full active:bg-orange-700 dark:active:bg-orange-800 duration-200 transition-all  dark:bg-orange-400'>
            <Image src={'/user.png'} width={25} height={25} alt='user'></Image>
          </button>
        </footer>
      </div>
    </>
  );
}

// popup
const AddPopUp: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <>

    </>
  )
}



//slide bar
export function SideBar({ open, setOpen }: any) {

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0  overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-14 top-0 -ml-0 flex pr-0 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="absolute -inset-2.5" />
                        {/* <span className="sr-only">Close panel</span> */}
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex items-center  h-full w-3/4 absolute right-0 flex-col overflow-y-scroll bg-white dark:bg-darkColor py-4 shadow-xl ">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="border-b-2 border-orange-400 my-2 text-base font-semibold leading-6 dark:text-gray-200 text-gray-900 ">
                        Profile
                      </Dialog.Title>
                    </div>
                    <div className='flex flex-col items-center bg-gray-200 dark:bg-gray-700 rounded-lg w-4/5 justify-center h-auto py-2'>
                      <div className='bg-orange-600 rounded-full mt-4 w-fit h-fit'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-person-fill text-white dark:text-indigo-300" viewBox="0 0 16 16">
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                        </svg>
                      </div>
                      <div className='pt-2 font-bold text-lg tracking-wide'>Sudeep Bogati</div>
                      <span className='text-xs p-1 italic '>hello@sudipbogati.com</span>
                      <div className='text-xs tracking-wide p-2'>Joined on : 13 April, 2024</div>
                    </div>
                    <div className=' flex flex-wrap items-center flex-col text-sm text-gray-700 gap-2 absolute bottom-0 w-full p-4 h-1/6 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-500 dark:text-gray-300 '>
                      <span className='border-b border-gray-200 w-fit mx-auto'>Developed by Sudeep Bogati</span>
                      <Link href={'/about-me'} className=' hover:underline w-fit'>About me </Link>
                      <span>hello@sudipbogati.com.np</span>
                      <span>+977-98*******</span>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}