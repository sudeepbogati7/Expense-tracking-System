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
import { useResponseData } from '@/components/ResponseDataContext';
// components
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { ErrorNotification, SuccessNotification } from '@/components/Notifications';


interface Expense {
  expenseId: number;
  expenseTitle: string;
  amount: number;
  userId: number;
  createdAt: string;
  // Add other properties if needed
}
export default function Home() {

  const router = useRouter();
  const { responseData, setResponseData } = useResponseData();
  const [error, setError] = useState(null);

  // check for the token 
  const token = localStorage.getItem('token');

  const [userData, setUserData] = useState(null);
  const [expenseData, setExpenseData] = useState<any[]>();

  useEffect(() => {
    const fetchData = async () => {

      try {
        if (!token) {
          router.push('/register');
          return;
        }

        // fetching user profile data
        const userResponse = await fetch('http://localhost:3001/api/user/profile', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        const userProfiledata = await userResponse.json();
        if (userResponse.ok) {
          setUserData(userProfiledata);
        } else {
          setError(userProfiledata);
        }

        // fetching user expenses data 
        const expenseResponse = await fetch('http://localhost:3001/api/expenses/my-expenses', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const expenseData = await expenseResponse.json();
        if (expenseResponse.ok) {
          setExpenseData(expenseData.data);
        } else {
          setError(expenseData);
        }


      } catch (err: any) {
        setError(err.message)
      }
    }
    fetchData();
  }, [token, router]);

  console.log(error);
  console.log("Expense data fetched :======> ", expenseData);
  console.log("User data profile ========>", userData);
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
      {error && <ErrorNotification error={error} />}
      {responseData && <SuccessNotification successResponse={responseData} />}
      <div className="container h-screen w-full">
        {/* header */}
        <Header />

        {/* Total Expense Viewer */}
        <div className='flex flex-col border-b-4 border-gray-200 dark:border-gray-600  h-38 w-full mx-auto '>
          <div className='text-xs w-4/5  text-center mx-auto pb-4 italic tracking-widest'> <span className='text-xl text-orange-500'>" </span>Track Your Money: Take Charge of Your Finances <span className='text-xl text-orange-500'>" </span></div>
          <div className='flex justify-center align-center'>
            <span className='text-2xl text-orange-600  mb-14 my-auto'>Rs. </span>
            <div className='text-7xl font-bold  p-4'>
              {expenseData && expenseData.length > 0 ? (
                expenseData.reduce((total: any, expense: any) => total + expense.amount, 0)
              ) : (
                "0"
              )}
            </div>
          </div>
          <span className='py-4 text-center align-center tracking-widest text-gray-500'>{getCurrentDate()}</span>
        </div>

        {/* List of the expenses */}
        <div className='shadow-gray-500/10 shadow-xl text-base shadow-md text-gray-500 dark:text-gray-400 flex justify-evenly px-6 py-4  '>
          <span>This Month's total </span>
          <div className='border-b-2 border-gray-400 dark:border-gray-500'> <span className='text-orange-500'> Rs. </span>
            {expenseData && expenseData.length > 0 ? (
              expenseData.reduce((total: any, expense: any) => total + expense.amount, 0)
            ) : (
              "0"
            )}
          </div>
        </div>
        <div className='flex flex-col gap-4 w-full h-2/4 overflow-y-scroll '>
          {expenseData && expenseData.length > 0 ? (
            expenseData.map((expense, index) => (
              <li
                key={index}
                className='mt-4 text-gray-700 flex justify-between border-b border-gray-300 px-8 py-4 dark:text-gray-300 dark:border-gray-700'
              >
                <div className='font-bold text-base'>
                  <span className='text-xl mr-2'></span>
                  {expense.expenseTitle}
                </div>
                <div className='text-lg'>
                  - <span className='text-red-500 dark:text-orange-500'>Rs. </span>
                  {expense.amount}
                </div>
              </li>
            ))
          ) : (
            <span className="text-gray-700 px-8 mx-auto py-4 dark:text-gray-300"> No expenses added ! </span>
          )}
        </div>

        <AddPopUp isOpen={isPopupOpen} onClose={togglePopup} />
        {/* <AddPopUp isOpen={isPopupOpen} onClose={togglePopup} /> */}
        {/* footer section */}
        <footer className='h-1/12 bg-white dark:bg-darkColor flex border border-gray-300 dark:border-gray-600 p-4 justify-around absolute left-0 bottom-0 w-full'>
          <Link href={'/dashboard'} className='bg-orange-200 active:bg-orange-700 duration-200 transition-all p-2 my-auto rounded-full dark:bg-orange-400'>
            <Image src={'/bar-chart.png'} width={25} height={25} alt='analytics'></Image>
          </Link>
          <button
            className="active:bg-orange-300 ease active:text-black transition-all duration-100 button my-auto"
            onClick={togglePopup}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20" fill="none" className="svg-icon"><g stroke-width="1.5" stroke-linecap="round" stroke="#de8a2a"><circle r="7.5" cy="10" cx="10"></circle><path d="m9.99998 7.5v5"></path><path d="m7.5 9.99998h5"></path></g></svg>
            <span className="lable">Add</span>
          </button>
          <SideBar userData={userData} open={open} setOpen={setOpen} />
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
      <div className='pop-up rounded-xl bg-[#eff0e4] gap-4 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 mb-24 h-1/2 right-14 w-4/5 items-center absolute bottom-0 flex flex-col mx-auto '>
        <span className='font-medium text-lg border-b-2 border-orange-500 px-2  my-4 '> Add Expense </span>
        <form
          className='w-full px-8'
        >
          <div className='flex gap-4 flex-col'>
            <label className='tracking-wide font-medium text-gray-600  w-fit pl-2' htmlFor="expenseTitle" >Title</label>
            <input
              className='border-none px-2 py-4 outline-none rounded-2xl'
              type="text"
              name='expenseTitle'
              required
              placeholder='eg.Food' />
          </div>
          <div className='flex gap-4  flex-col mt-4'>
            <label className='tracking-wide font-medium  text-gray-600 w-fit pl-2' htmlFor="expenseTitle" >Amount (Rs.)</label>
            <input
              className='border-none px-2 py-4 outline-none rounded-2xl'
              type="number"
              name='expenseTitle'
              required
              placeholder='eg.2500' />
          </div>
          <div className="flex mt-2 max-w-sm items-center justify-between p-4  mx-auto ">
            <button onClick={onClose} className="active:bg-white  py-2.5 px-6 border rounded-lg text-sm font-medium bg-gray-300 text-teal-900">Cancel</button>
            <button type='submit' className="active:bg-green-400 transition-all duration-200 ease py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-teal-600">Confirm</button>
          </div>
        </form>
      </div>
    </>
  )
}



//slide bar
export function SideBar({ open, setOpen, userData }: any) {

  // user created data in simple format
  let joinedDate = new Date((userData as any)?.user.createdAt)
  const formattedDate = joinedDate.toDateString();

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
                    <div className="px-4 sm:px-6 overflow-hidden">
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
                      <div className='pt-2 font-bold text-lg tracking-wide'>{userData ? userData.user.fullName : "NO DATA"}</div>
                      <span className='text-xs p-1 italic '>{userData ? userData.user.email : "nodata@user.com"}</span>
                      <div className='text-xs tracking-wide p-2'>Joined on : {formattedDate}</div>
                    </div>
                    <div className=' flex flex-wrap items-center flex-col text-sm text-gray-700 gap-2 absolute bottom-0 w-full p-4 h-1/6 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-500 dark:text-gray-300 '>
                      <span className='border-b border-gray-200 w-fit mx-auto'>By Sudeep Bogati</span>
                      <Link href={'/about'} className=' text-blue-500 hover:underline w-fit'>About</Link>
                      <span className='text-sm '>hello@sudipbogati.com.np</span>
                      <span className='text-sm'>+977-98*******</span>
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

