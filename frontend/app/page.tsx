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
const token = localStorage.getItem('token');

export default function Home() {
  const router = useRouter();
  const { responseData, setResponseData } = useResponseData();
  const [error, setError] = useState(null);



  // check for the token 

  const [userData, setUserData] = useState(null);
  const [expenseData, setExpenseData] = useState<any[]>();

  useEffect(() => {
    const fetchData = async () => {

      try {
        // if (!token) {
        //   router.push('/register');
        //   return;
        // }

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

  // date
  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toDateString(); // You can customize the format as needed
  };

  // pop up for adding new expense
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // Popup for editing expense
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const toggleEditPopup = (expense: any) => {
    setSelectedExpense(expense)
    setEditPopupOpen(true);
  }

  const [showFilters, setShowFilters] = useState(false);

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  }

  // side bar for user Info
  function toggleSideBar() {
    setOpen(!open)
  }
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const getFormattedDate = (unformattedDate: any) => {
    let joinedDate = new Date(unformattedDate);
    const day = joinedDate.getDate();
    const month = joinedDate.toLocaleString('default', { month: 'short' }); // Get month abbreviation
    const weekday = joinedDate.toLocaleString('default', { weekday: 'short' }); // Get weekday abbreviation

    return `${weekday}, ${month} ${day}`;
  };


  function extractUniqueCategories(expenseData: any) {
    const uniqueCategories = new Set();
    (expenseData as any)?.forEach((expense: any) => {
      uniqueCategories.add(expense.category);
    });
    return Array.from(uniqueCategories);
  }

  const categories = extractUniqueCategories(expenseData);

  // checked categories 
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (event.target.checked) {
      setCheckedCategories((prevState) => [...prevState, value]);
    } else {
      setCheckedCategories((prevState: any) => prevState.filter((item: any) => item !== value));
    }
  };

  let filteredExpenses = checkedCategories.length > 0 ?
    (expenseData as any)?.filter((expense: any) => checkedCategories.includes(expense.category)) : expenseData;

  console.log("Checked Categories : ", checkedCategories)
  console.log("Filtered expenses : ", filteredExpenses)

  const [animated, setAnimated] = useState(false);
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
          <div className='flex justify-center align-center animate-popup'>
            <span className='text-2xl text-orange-600  mb-14 my-auto'>Rs. </span>
           <div className={`p-4 ${filteredExpenses && filteredExpenses.length > 0 ? 'animate-slide-in' : ''} ${filteredExpenses && filteredExpenses.length > 0 ? (filteredExpenses.reduce((total: any, expense: any) => total + expense.amount, 0).toString().length > 6 ? 'text-3xl' : 'text-7xl') : 'text-7xl'} font-bold`}>
              {filteredExpenses && filteredExpenses.length > 0 ? (
                filteredExpenses.reduce((total: any, expense: any) => total + expense.amount, 0)
              ) : (
                "0"
              )}
            </div>
          </div>
          <span className='py-4 text-center align-center tracking-widest text-gray-500'>{getCurrentDate()}</span>
        </div>

        {/* List of the expenses */}
        <div className='shadow-gray-500/10 shadow-xl flex items-center justify-around text-base shadow-md text-gray-500 dark:text-gray-400 flex justify-center gap-6  px-6 py-4  '>
          <div className='flex gap-4 '>
            <label htmlFor="category">Filter category : </label>
            <div
              onMouseEnter={() => setShowFilters(true)}
              onMouseLeave={() => setShowFilters(false)}
              className={`group flex items-center bg-indigo-300 text-gray-600 dark:bg-indigo-500  dark:text-white cursor-pointer border border-gray-400  px-2 rounded-xl `}>
              <span className='text-xs text-white'>Select Category</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
            <div
              onMouseEnter={() => setShowFilters(true)}
              onMouseLeave={() => setShowFilters(false)}
              className={`rounded-lg absolute animate-popup mt-6 mx-auto right-1/2 bg-indigo-100 pt-2 dark:bg-gray-800 dark:text-gray-100 border-gray-400 p-2 ${showFilters ? 'block' : 'hidden'}`}
            >
              {categories.map((category: any) => (
                <div className='px-2 flex gap-1 ' key={category}>
                  <input
                    className='cursor-pointer'
                    type="checkbox"
                    name="category"
                    value={category}
                    id={category}
                    onChange={handleCheckboxChange}
                    checked={(checkedCategories as any)?.includes(category)}
                  />
                  <label
                    className='cursor-pointer hover:bg-white w-full text-gray-500 hover:text-gray-900 transition-all duration-200 ease-in-out dark:hover:text-gray-100 dark:hover:bg-gray-900'
                    htmlFor={category}
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button onClick={() => setCheckedCategories([])} className='bg-green-600 text-white text-xs px-2 active:scale-125 transform transition-all duration-300 ease-in-out rounded-xl py-1'>Clear filters </button>

        </div>
        <div className='flex flex-col w-full h-2/4 overflow-y-scroll pb-4 animate-fade-in'>
          {filteredExpenses && filteredExpenses.length > 0 ? (
            filteredExpenses.map((expense: any, index: any) => (
              <li
                key={index}
                className='mt-4 text-gray-700 flex justify-between border-b border-gray-300 px-4 py-4 dark:text-gray-300 dark:border-gray-700 animate-slide-in '
              >
                <div className='font-bold text-sm flex justify-left items-center gap-1 border-r border-gray-500 pr-1'>
                  <span className='text-sm '>
                    {expense.expenseTitle}
                  </span>
                  <span onClick={() => toggleEditPopup(expense)} className='cursor-pointer hover:bg-indigo-100 rounded-full active:scale-125 transition-all duration-200  dark:bg-gray-300 dark:active:bg-blue-300 '><Image src={'/edit.png'} width={14} height={14} alt='edit-ong'></Image></span>
                </div>
                <div className='text-xs text-center h-fit w-fit my-auto bg-indigo-200 rounded-xl px-2 dark:bg-indigo-500'>{expense.category}</div>
                <div className='text-xs text-center tracking-widest my-auto'> {getFormattedDate(expense.createdAt)} </div>
                <div className='text-base'>
                  - <span className='text-red-500 dark:text-orange-500'>Rs. </span>
                  {expense.amount}
                </div>
                {selectedExpense && <EditPopup expenseData={selectedExpense} editPopupOpen={editPopupOpen} onclose={() => setEditPopupOpen(false)} />}

              </li>
            ))
          ) : (
            <span className="text-gray-700 px-8 mx-auto py-4 dark:text-gray-300"> No expenses added ! </span>
          )}
        </div>


        <AddPopUp isOpen={isPopupOpen} onClose={togglePopup} setIsOpen={setIsPopupOpen} />
        {/* <AddPopUp isOpen={isPopupOpen} onClose={togglePopup} /> */}
        {/* footer section */}
        <footer className='h-1/12 bg-white dark:bg-darkColor mt-32 flex border border-gray-300 dark:border-gray-600 p-4 justify-around fixed left-0 bottom-0 w-full'>
          <Link href={'/dashboard'} className=' animate-scale-in bg-orange-200 active:bg-orange-700 duration-200 transition-all p-2 my-auto rounded-full dark:bg-orange-400'>
            <Image src={'/bar-chart.png'} width={25} height={25} alt='analytics'></Image>
          </Link>
          <button
            className="animate-popup active:bg-orange-300 ease active:text-black transition-all duration-300 button my-auto"
            onClick={() => setIsPopupOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20" fill="none" className="svg-icon"><g stroke-width="1.5" stroke-linecap="round" stroke="#de8a2a"><circle r="7.5" cy="10" cx="10"></circle><path d="m9.99998 7.5v5"></path><path d="m7.5 9.99998h5"></path></g></svg>
            <span className="lable">Add</span>
          </button>
          <SideBar userData={userData} open={open} setOpen={setOpen} />
          <button
            onClick={toggleSideBar}
            className='animate-scale-in bg-orange-200 p-2 my-auto rounded-full active:bg-orange-700 dark:active:bg-orange-800 duration-200 transition-all  dark:bg-orange-400'>
            <Image src={'/user.png'} width={25} height={25} alt='user'></Image>
          </button>
        </footer>
      </div>
    </>
  );
}

//====================================================================Add popup====================================================================
const AddPopUp = ({ onClose, isOpen, setIsOpen }: any) => {
  const router = useRouter();
  const { responseData, setResponseData } = useResponseData();
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    expenseTitle: '',
    amount: '',
    category: ''
  });
  // const handleChange = (e: any) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const [customCategory, setCustomCategory] = useState('');
  const [categories, setCategories] = useState([
    { value: 'education', label: '📚 Education' },
    { value: 'transport', label: '🚌 Transport' },
    { value: 'foods', label: '🍲 Foods' },
    { value: 'health', label: '🩺 Health' },
    { value: 'tech', label: '🖥️ Tech' },
    { value: 'furniture', label: ' 🛋️ Furniture' },
    { value: 'housing', label: '🏠 Housing' },
    { value: 'saving', label: '💰 Savings and Investments' },
    { value: 'entertainment', label: '🎉 Entertainment' },
    { value: 'clothing', label: '👔 Clothing' },
    { value: 'accessories', label: '💍 Accessories' },

  ]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'category') {
      const selectedCategory = categories.find(category => category.value === value);
      setFormData({ ...formData, [name]: selectedCategory ? selectedCategory.label : value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCustomCategoryChange = (e: any) => {
    setCustomCategory(e.target.value);
  };

  const handleAddCustomCategory = () => {
    if (customCategory.trim() !== '') {
      const newCategory = {
        value: customCategory.toLowerCase(),
        label: customCategory
      };
      setCategories([...categories, newCategory]);
      setFormData({ ...formData, category: customCategory });
      setCustomCategory('');
    }
  };

  const handleExpenseSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/expenses/add', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setResponseData(data);
        setFormData({
          expenseTitle: '',
          amount: '',
          category: ''
        });
        onClose()
      } else {
        setError(data); // Set error state if request fails
      }
    } catch (error) {
      console.error("Error while adding expense:", error);
      setError(error as any); // Set error state if fetch fails
    }
  };

  console.log("Error while adding expense:", error);
  console.log("Successfully added:", responseData);
  if (!isOpen) return null;

  console.log("Form data on add expense : ", formData);
  return (
    <>
      {responseData && <SuccessNotification successResponse={responseData} />}
      {error && <ErrorNotification error={error} />}
      <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden flex items-center justify-center">
        {/* Overlay */}
        <div aria-hidden="true" className="fixed inset-0 bg-black opacity-60"></div>

        <div className={`relative pop-up rounded-xl bg-gray-100 gap-4 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 mb-24 h-fit py-4 w-4/5 items-center flex flex-col mx-auto animate-popup`}>
          <span className='font-medium text-lg border-b-2 border-orange-500 px-2 '> Add Expense </span>
          <form
            onSubmit={handleExpenseSubmit}
            className='w-full px-8'
          >
            <div className='flex gap-4 flex-col'>
              <label className='tracking-wide font-medium text-gray-600 dark:text-gray-200  w-fit pl-2' htmlFor="expenseTitle" >Title</label>
              <input
                className='border-2 focus:border-indigo-500 border-gray-300 dark:bg-gray-600 dark:focus:border-indigo-300   p-2 outline-none rounded-2xl'
                type="text"
                value={formData.expenseTitle}
                name='expenseTitle'
                required
                onChange={handleChange}
                placeholder='eg.Food' />
            </div>
            <div className='flex gap-4  flex-col mt-4'>
              <label className='tracking-wide font-medium dark:text-gray-200 text-gray-600 w-fit pl-2' htmlFor="expenseTitle" >Amount (Rs.)</label>
              <input
                className='border-2 focus:border-indigo-500 border-gray-300 dark:bg-gray-600 dark:focus:border-indigo-300 p-2 outline-none rounded-2xl'
                type="number"
                value={formData.amount}
                name='amount'
                onChange={handleChange}
                required
                placeholder='eg.2500' />
            </div>
            <div className='flex gap-2 flex-col mt-4 '>
              <label className='tracking-wide font-medium dark:text-gray-200 text-gray-600 w-fit pl-2' htmlFor="category">Category</label>
              <select className='p-2 focus:border-indigo-500 dark:bg-gray-700 rounded-xl bg-white outline-none border-2 border-gray-300 ' required onChange={handleChange} value={formData.category} name="category">
                <option value="">Select</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.label}>{category.label}</option>
                ))}
              </select>
              <div className='flex items-center justify-center gap-2 mb-4  '>
                <input type="text" value={customCategory} onChange={handleCustomCategoryChange} className='p-1 rounded-lg w-3/4 bg-white outline-none border-2 focus:border-gray-400 border-gray-300 dark:focus:border-indigo-500 dark:bg-gray-900' placeholder="Custom category (eg.Clothes) " />
                <div onClick={handleAddCustomCategory} className='cursor-pointer text-center active:bg-green-600 w-1/4 px-2 py-1 w-full rounded-lg bg-blue-500 text-white mx-auto '>Add </div>
              </div>
            </div>

            <div className="flex mt-2 max-w-sm items-center justify-between gap-4 p-4  mx-auto ">
              <div onClick={() => setIsOpen(false)} className=" cursor-pointer active:bg-white  py-2.5  px-6 border rounded-lg text-sm font-medium bg-gray-300 text-teal-900">Cancel</div>
              <button type='submit' className="cursor-pointer active:bg-green-400 transition-all duration-200 ease py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-teal-600">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}



//====================================================================Edit popup====================================================================

export function EditPopup({ expenseData, editPopupOpen, onclose }: any) {
  const router = useRouter();

  const [customCategory, setCustomCategory] = useState('');
  const [categories, setCategories] = useState([
    { value: 'education', label: '📚 Education' },
    { value: 'transportation', label: '🚌 Transportation' },
    { value: 'foods', label: '🍲 Foods' },
    { value: 'health', label: '🩺 Health' },
    { value: 'tech', label: '🖥️ Tech' },
    { value: 'furniture', label: ' 🛋️ Furniture' }
  ]);

  const [editTitle, setEditTitle] = useState(false);
  const [editAmount, setEditAmount] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const { responseData, setResponseData } = useResponseData();
  const [error, setError] = useState(null);


  const [formData, setFormData] = useState({
    expenseTitle: expenseData.expenseTitle,
    amount: expenseData.amount,
    category: expenseData.category
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'category') {
      const selectedCategory = categories.find(category => category.value === value);
      setFormData({ ...formData, [name]: selectedCategory ? selectedCategory.label : value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleExpenseSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/expenses/edit/${expenseData.expenseId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setResponseData(data);
      } else {
        setError(data);
      }
    } catch (error) {
      console.error("Error while adding expense:", error);
      setError(error as any);
    }
  };

  const handleExpenseDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/expenses/delete/${expenseData.expenseId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();
      if (response.ok) {
        setResponseData(data);
        onclose();
      }
      else {
        setError(data);
      }
    } catch (error) {
      console.log("error while deleting expense : ", error)
      setError(error as any)
    }
  }

  console.log("Edit expense data ==> ", expenseData)
  if (!editPopupOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden flex items-center justify-center">
        {/* Overlay */}
        <div aria-hidden="true" className="fixed inset-0 bg-black opacity-10"></div>

        <div className={`relative animate-popup rounded-xl bg-gray-100 gap-4 dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-600 mb-24 h-fit py-4 w-4/5 items-center flex flex-col mx-auto  `}>
          <span className='font-medium text-lg border-b-2 border-green-500 px-2  my-2 '> Edit Expense </span>
          <button onClick={handleExpenseDelete} className='absolute bg-red-600 rounded-xl px-2 right-4 mt-2 text-white tex-sm cursor-pointer active:bg-red-800'>Delete</button>
          <form
            onSubmit={handleExpenseSubmit}
            className='w-full px-8'
          >
            <div className='flex gap-4 flex-col'>
              <label className='tracking-wide flex items-center gap-4 font-medium text-gray-600 dark:text-gray-200  w-fit pl-2' htmlFor="expenseTitle" ><span>Title</span> <span onClick={() => setEditTitle(true)} className='cursor-pointer border border-gray-400 px-1 text-xs 1 rounded-lg active:scale-110 transition-all dark:text-gray-200 dark:bg-gray-500  transform bg-blue-200 flex items-center gap-1 '>edit<Image src={'/edit.png'} width={12} height={12} alt='edit-ong'></Image></span> </label>
              <input
                className={`${editTitle ? "border-blue-300 border" : ""} border border-gray-300  p-2 outline-none rounded-2xl`}
                type="text"
                value={formData.expenseTitle}
                name='expenseTitle'
                required={editTitle}
                disabled={!editTitle}
                // readOnly={!editTitle}
                onChange={handleChange}
                placeholder='eg.Food' />
            </div>
            <div className='flex gap-4  flex-col mt-4'>
              <label className='tracking-wide flex items-center gap-4 font-medium text-gray-600 dark:text-gray-200  w-fit pl-2' htmlFor="expenseTitle" ><span>Amount</span> <span onClick={() => setEditAmount(true)} className='cursor-pointer border text-xs border-gray-400 px-1 rounded-lg active:scale-110 transition-all dark:text-gray-200 dark:bg-gray-500  transform bg-blue-200 flex items-center gap-1 '>edit<Image src={'/edit.png'} width={12} height={12} alt='edit-ong'></Image></span> </label>
              <input
                className={`${editAmount ? "border-blue-300 border" : ""}  border border-gray-300 p-2 outline-none rounded-2xl`}
                type="number"
                value={formData.amount}
                name='amount'
                onChange={handleChange}
                required={editAmount}
                disabled={!editAmount}
                readOnly={!editAmount}
                placeholder='eg.2500' />
            </div>
            <div className='flex gap-2 flex-col mt-4'>
              <label className='tracking-wide flex items-center gap-4 font-medium text-gray-600 dark:text-gray-200  w-fit pl-2' htmlFor="expenseTitle" ><span>Category</span> <span onClick={() => setEditCategory(true)} className='cursor-pointer text-xs border border-gray-400 px-1 rounded-lg active:scale-110 transition-all dark:text-gray-200 dark:bg-gray-500  transform bg-blue-200 flex items-center gap-1 '>edit<Image src={'/edit.png'} width={12} height={12} alt='edit-ong'></Image></span> </label>
              <select
                aria-readonly={!editCategory}
                disabled={!editCategory}
                required={editCategory}
                onChange={handleChange}
                className={`${editCategory ? "border-blue-300 border" : ""} p-2 rounded-xl bg-white outline-none dark:bg-gray-700 dark:text-gray-200 border border-gray-300`}
                defaultValue={formData.category}
                name="category">
                <option value="">Select</option>
                {categories.map((category) => (
                  <option key={category.value} value={category.label}>{category.label}</option>
                ))}
              </select>
              <div className='flex items-center justify-center gap-2 mb-4 '>
                <input disabled={!editCategory} readOnly={!editCategory} type="text" value={customCategory} className={`${editCategory ? "border-blue-300 border" : ""} p-1 w-3/4 dark:bg-gray-700 rounded-lg bg-white outline-none border focus:border-gray-400 border-gray-300`} placeholder="Custom category (eg.Clothes)" />
                <div className='cursor-pointer text-center active:bg-green-600 px-2 py-1  w-1/4 rounded-lg bg-blue-700 text-white mx-auto '>Add </div>
              </div>
            </div>

            <div className="flex mt-2 max-w-sm items-center justify-between gap-4 p-4  mx-auto ">
              <div onClick={onclose} className=" cursor-pointer active:bg-white  py-2.5  px-6 border rounded-lg text-sm font-medium bg-gray-300 text-teal-900">Cancel</div>
              <button type='submit' className="active:bg-green-400 transition-all duration-200 ease py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-teal-600">Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
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

