import React from "react";
import './loading.css';

// import 'tailwindcss/tailwind.css';
export default function Loading() {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/60 ">
            <div className="loader dark:bg-gray-700">
                <label className="loading-label">Please wait...</label>
                <div className="loading"></div>
            </div>
        </div>
    )
}