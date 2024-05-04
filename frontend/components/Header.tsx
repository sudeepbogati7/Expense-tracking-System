import Link from "next/link";
import React, { useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useRouter } from "next/navigation";

import Cookies from 'js-cookie';


export default function Header() {
    const router = useRouter();

    const logout = () => {
        // Remove the token cookie
        Cookies.remove('token');
        router.push("/register");
    };
    const handleLogoutClick = () => {
        setShowLogoutPopup(true);
    };
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    return (
        <header className="h-16  flex align-center shadow-gray-500/10 shadow-md justify-between w-full p-4  dark:shadow-gray-500/30">
            <span className=" my-auto active:scale-125 transition-all duration-300 transform ">
                <ThemeSwitcher />
            </span>
            <Link href={"/"}>
                {" "}
                <div className="animate-scale-in tracking-widest font-medium flex text-lg border-b-2 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-900  ease-linear dark:border-gray-500 border-gray-300 my-auto">
                    <span className="text-sm tracking-widest font-normal  border-t-2 border-orange-600 ">my </span>
                    <span className="text-3xl text-orange-600 "> X</span>
                    <span className="tracking-widest text-base font-normal border-t-2 border-gray-300 hover:border-orange-500 transition-all duration--900 ease-linear"> penses</span>
                </div>
            </Link>
            <div onClick={handleLogoutClick} className=" transition-all duration-300 Btn my-auto">
                <div className="sign">
                    <svg viewBox="0 0 512 512">
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                </div>

                <div className="text">Logout</div>
            </div>
            {showLogoutPopup && (
                <LogoutPopup
                    logout={() => logout()}
                    onClose={() => setShowLogoutPopup(false)}
                />
            )}
        </header>
    );
}

export function LogoutPopup({ onClose, logout }: any) {

    const [loading, setLoading] = useState(false);
    const handleLogout = async () => {
        try {
            setLoading(true)
            await logout();
            onClose()
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden flex items-center justify-center">
            {/* Overlay */}
            <div aria-hidden="true" className="fixed inset-0 bg-black opacity-60"></div>

            {/* Popup */}
            <div className="relative dark:bg-gray-700 dark:text-gray-200 bg-white rounded-lg shadow-md p-6 transform translate-y-4 transition-transform duration-300">
                {/* Close button */}
                <button onClick={onClose} type="button" className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-200">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Popup content */}
                <h2 className="text-xl dark:text-gray-200 font-bold mb-4">Logout?</h2>
                <p className="text-gray-700 dark:text-gray-200">Are you sure you would like to logout?</p>

                {/* Buttons */}
                <div className="mt-6 flex justify-center space-x-4">
                    {/* Cancel button */}
                    <button type="button" onClick={onClose} disabled={loading} className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors duration-300 ease-in-out focus:outline-none focus:ring focus:ring-gray-300">
                        Cancel
                    </button>

                    {/* Confirm button */}
                    <button type="button" onClick={handleLogout} disabled={loading} className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-300 ease-in-out focus:outline-none focus:ring focus:ring-red-300">
                        {loading ? 'Logging out...' : 'Confirm'}
                    </button>
                </div>
            </div>
        </div>
    );
}