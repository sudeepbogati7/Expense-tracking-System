'use client';


import '../page.css';
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
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    scales,
    Scale,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);
ChartJS.register(ArcElement, Tooltip, Legend);

interface Expense {
    expenseId: number;
    expenseTitle: string;
    amount: number;
    category: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
}


import Cookies from 'js-cookie';

const token = Cookies.get('token');


export default function Dashboard() {

    const router = useRouter();
    const { responseData, setResponseData } = useResponseData();
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [expenseData, setExpenseData] = useState<any[]>();
    const [open, setOpen] = useState(false);


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
    }, [router]);

    // date
    const getCurrentDate = () => {
        const currentDate = new Date();
        return currentDate.toDateString(); // You can customize the format as needed
    };
    function toggleSideBar() {
        setOpen(!open)
    }

    const getFormattedDate = (unformattedDate: any) => {
        let joinedDate = new Date(unformattedDate);
        const day = joinedDate.getDate();
        const month = joinedDate.toLocaleString('default', { month: 'short' }); // Get month abbreviation
        const weekday = joinedDate.toLocaleString('default', { weekday: 'short' }); // Get weekday abbreviation

        return `${weekday}, ${month} ${day}`;
    };




    // --------------------------------- For bar graph ----------------------------------------------
    function getTotalExpensesByCategory(expenses: Expense[]): { [key: string]: number } {
        const totalExpensesByCategory: { [key: string]: number } = {};

        // Group expenses by category and sum up the amounts for each category
        expenses?.forEach(expense => {
            const { category, amount } = expense;
            if (totalExpensesByCategory.hasOwnProperty(category)) {
                totalExpensesByCategory[category] += amount;
            } else {
                totalExpensesByCategory[category] = amount;
            }
        });

        return totalExpensesByCategory;
    }
    const totalExpensesByCategory = getTotalExpensesByCategory(expenseData as any);



    // total expense amount per day 
    function getTotalExpensesByDay(expenses: Expense[]): { [key: string]: number } {
        const totalExpensesByDay: { [key: string]: number } = {};

        // Group expenses by day and sum up the amounts for each day
        expenses?.forEach(expense => {
            const createdAt = new Date(expense.createdAt);
            const day = createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            if (totalExpensesByDay.hasOwnProperty(day)) {
                totalExpensesByDay[day] += expense.amount;
            } else {
                totalExpensesByDay[day] = expense.amount;
            }
        });

        return totalExpensesByDay;
    }
    const totalExpensesByDay = getTotalExpensesByDay(expenseData as any);
    console.log("Toal expense byd ay : ", totalExpensesByDay)

    // ---------------------------for bar graph ---------------------------
    const dayLabel = Object.keys(totalExpensesByDay)
    const dailyExpenseCount = Object.values(totalExpensesByDay)
    const expenseByDayOptions = {
        indexAxis: 'x' as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
    };


    const expeseByDayData = {
        labels: dayLabel,
        datasets: [
            {
                label: '',
                data: dailyExpenseCount,
                borderColor: 'rgb(100, 84, 135)',
                backgroundColor: 'rgb(168, 148, 212)',
            },
        ],
    };
    console.log("dayLabel", dayLabel)
    console.log("day data", dailyExpenseCount)



    // --------------------------- for pie chart ---------------------------
    const categoryLabels = Object.keys(totalExpensesByCategory).sort();
    const categoryExpenseCounts = Object.values(totalExpensesByCategory);
    const generateRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r}, ${g}, ${b}, 0.6)`;
    };

    const backgroundColors = [];
    const borderColors = [];
    for (let i = 0; i < categoryLabels.length; i++) {
        const color = generateRandomColor();
        backgroundColors.push(color);
        borderColors.push(color.replace('0.6', '1')); // Use the same color with full opacity for borderColor
    }

    const data = {
        labels: categoryLabels,
        datasets: [{
            data: categoryExpenseCounts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
        }]
    };

    return (
        <>
            <Header />
            <main className='flex flex-col items-center justify-center pb-24'>
                <h2 className='text-center px-2 font-medium text-orange-600 border-b-2 border-blue-400 w-fit  mx-auto my-4'> Expense Distribution based on Categories </h2>
                <div className='w-4/5 mx-auto  h-96'>
                    <Pie data={data} />
                </div>
                <h2 className='text-center px-2 font-medium text-orange-600 border-b-2 border-blue-400 w-fit mx-auto my-6'>Daily Expense Analysis </h2>
                <div className='w-full mx-auto h-96'>
                    <Bar data={expeseByDayData} options={expenseByDayOptions}/>
                </div>
            </main>
            <footer className='h-1/12 bg-white dark:bg-darkColor mt-32 flex border border-gray-300 dark:border-gray-600 p-4 justify-around fixed left-0 bottom-0 w-full'>
                <Link href={'/dashboard'} className='border-b-4 border-blue-600 animate-scale-in bg-orange-500 active:bg-orange-700 duration-200 transition-all p-2 my-auto rounded-full dark:bg-orange-400'>
                    <Image src={'/bar-chart.png'} width={25} height={25} alt='analytics'></Image>
                </Link>
                <Link
                    href={'/'}
                    className="border-b-4 border-blue-600 animate-scale-in active:scale-125 transform duration-300 ease-in-out flex items-center rounded-full w-fit px-2 bg-blue-300 "
                >
                    <span className='w-fit h-fit '><Image src={'/home.png'} width={26} height={26} alt='home'></Image></span>
                </Link>
                <SideBar userData={userData} open={open} setOpen={setOpen} />
                <button
                    onClick={toggleSideBar}
                    className='active:scale-125 transform border-b-4 border-blue-600 animate-scale-in bg-orange-200 p-2 my-auto rounded-full active:bg-orange-700 dark:active:bg-orange-800 duration-200 transition-all  dark:bg-orange-400'>
                    <Image src={'/user.png'} width={25} height={25} alt='user'></Image>
                </button>
            </footer>
        </>
    );
}


function SideBar({ open, setOpen, userData }: any) {
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
                    <div className='animate-scale-in duration-500 flex flex-col items-center bg-blue-200 dark:bg-gray-700 rounded-lg w-4/5 justify-center h-auto py-2'>
                      <div className='bg-orange-600 rounded-full mt-4 w-fit h-fit'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-person-fill text-white dark:text-indigo-300" viewBox="0 0 16 16">
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                        </svg>
                      </div>
                      <div className='pt-2 font-bold text-lg tracking-wide'>{userData ? userData.user.fullName : "NO DATA"}</div>
                      <span className='text-xs p-1 italic '>{userData ? userData.user.email : "nodata@user.com"}</span>
                      <div className='text-xs tracking-wide p-2'>Joined on : {formattedDate}</div>
                    </div>


                    {/* <div>
                      <h1 className='text-center px-2 font-medium border-gray-200 border-b-2 m-4 w-fit mx-auto'> My Expense Logs </h1>
                      <div className='mx-2 p-2 h-96 overflow-y-scroll bg-gray-200'>
                        <div className='text-xs'>Added new expense : <span> {"Expense Title"} </span> on <span> may 2 , 2024 05:12 AM </span></div>
                        <div className='text-xs'>Edited : <span> {"Expense Title"} </span> on <span> may 2 , 2024 05:12 AM </span></div>
                        <div className='text-xs'>Added new expense : <span> {"Expense Title"} </span> on <span> may 2 , 2024 05:12 AM </span></div>
                        <div className='text-xs'>Added new expense : <span> {"Expense Title"} </span> on <span> may 2 , 2024 05:12 AM </span></div>
                        <div className='text-xs'>Added new expense : <span> {"Expense Title"} </span> on <span> may 2 , 2024 05:12 AM </span></div>
                        <div className='text-xs'>Added new expense : <span> {"Expense Title"} </span> on <span> may 2 , 2024 05:12 AM </span></div>
                        <div className='text-xs'>Added new expense : <span> {"Expense Title"} </span> on <span> may 2 , 2024 05:12 AM </span></div>
                       </div>
                    </div> */}



                    <div className=' flex flex-wrap items-center justify-center flex-col text-sm text-gray-700 gap-2 absolute bottom-0 w-full py-4 h-1/6 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-500 dark:text-gray-300 '>
                      <span className='border-b border-gray-200 w-fit mx-auto'>By Sudeep Bogati</span>
                      <Link href={'/about'} className=' text-blue-500 hover:underline w-fit'>About</Link>
                      <span className='text-sm'>info@sudipbogati.com.np</span>
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


