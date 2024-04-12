'use client';
'use client';
import './login.css';
import '../page.css';
import 'tailwindcss/tailwind.css';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import Link from 'next/link';

export default function Login() {
    return (
        <div>
            <header className='h-16  flex align-center shadow-gray-500/10 shadow-md justify-between  w-full p-4 dark:shadow-gray-500/30 border dark:border-gray-600'>
                <span className='my-auto'><ThemeSwitcher /></span>
                <Link href={'/'}> <p className='font-medium text-lg border-b-2 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-900  ease-linear dark:border-gray-500 border-gray-300 my-auto'>My <span className='text-orange-600'> Expenses </span></p></Link>
                <button className='border-2 px-3 rounded-xl text-center border-orange-400 hover:bg-orange-300 transition-all duration-300 '>
                    About
                </button>
            </header>
            <main>
                <div className='flex flex-col flex-wrap align-center justify-center container border border-red-400 p-4 w-full'>
                    <span className='text-center text-xl font-medium p-2'> <span className='text-orange-600 border-b border-orange-300'> Login </span> Your Identity</span>
                    <form action="" className='flex flex-col p-6 justify-center mx-auto w-full'>
                        <div className='flex flex-col w-full p-4'>
                            <label className='mx-2 font-medium tracking-wide' htmlFor="email">Email</label>
                            <input
                                type="email"
                                name='email'
                                placeholder='sudeep@example.com'
                                className='w-full border-2 border-gray-200 p-2 rounded-lg outline-none'
                            />
                        </div>
                        <div className='w-full p-4'>
                            <label className='tracking-wide mx-2 font-medium' htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                className='w-full border-2 border-gray-200 p-2 rounded-lg outline-none'
                                placeholder='********' />
                        </div>
                        <button className='border rounded-xl p-2 text-md font-medium tracking-wide w-full mx-auto hover:bg-orange-300 transition-all duration-300  border-orange-600' > Login </button>

                    </form>
                </div>
            </main>
        </div>
    )
}