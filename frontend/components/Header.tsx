import Link from "next/link";
import React, { useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useRouter } from "next/navigation";
export default function Header() {
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/register");
    };
    const handleLogoutClick = () => {
        setShowLogoutPopup(true);
    };
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    return (
        <header className="h-16  flex align-center shadow-gray-500/10 shadow-md justify-between w-full p-4 dark:shadow-gray-500/30">
            <span className="my-auto">
                <ThemeSwitcher />
            </span>
            <Link href={"/"}>
                {" "}
                <p className="font-medium text-lg border-b-2 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-900  ease-linear dark:border-gray-500 border-gray-300 my-auto">
                    My <span className="text-orange-600"> Expenses </span>
                </p>
            </Link>
            <div onClick={handleLogoutClick} className="Btn my-auto">
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
    return (
        <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
            <div
                aria-hidden="true"
                className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
            ></div>

            <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
                <div className="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">
                    <button
                        onClick={onClose}
                        type="button"
                        className="absolute top-2 right-2 rtl:right-auto rtl:left-2"
                    >
                        <svg
                            className="h-4 w-4 cursor-pointer text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                        <span className="sr-only">Close</span>
                    </button>

                    <div className="space-y-2 p-2">
                        <div className="p-4 space-y-2 text-center dark:text-white">
                            <h2
                                className="text-xl font-bold tracking-tight"
                                id="page-action.heading"
                            >
                                Logout ?
                            </h2>

                            <p className="text-gray-500">
                                Are you sure you would like to logout?
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div
                            aria-hidden="true"
                            className="border-t dark:border-gray-700 px-2"
                        ></div>

                        <div className="px-6 py-2">
                            <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800"
                                >
                                    <span className="flex items-center gap-1">
                                        <span className="">Cancel</span>
                                    </span>
                                </button>

                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700"
                                >
                                    <span onClick={logout} className="flex items-center gap-1">
                                        <span className="">Confirm</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
