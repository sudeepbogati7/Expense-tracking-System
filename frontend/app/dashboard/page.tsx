'use client';
import 'tailwindcss/tailwind.css';
import '../page.css';
import React from 'react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import Link from 'next/link';

export default function Dashboard() {
    return (
        <div>
            <header className='h-16  flex align-center shadow-gray-500/10 shadow-md justify-between w-full p-4 dark:shadow-gray-500/30 border dark:border-gray-600'>
                <span className='my-auto'><ThemeSwitcher /></span>
                <Link href={'/'}> <p className='font-medium text-lg border-b-2 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-900  ease-linear dark:border-gray-500 border-gray-300 my-auto'>My <span className='text-orange-600'> Expenses </span></p></Link>
                <button className="Btn my-auto">
                    <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
                    <div className="text">Logout</div>
                </button>
            </header>
            <main className='text-center h-full'>
                Graphs and charts
                <br />
                [ To DO ]
            </main>


        </div>
    )

}