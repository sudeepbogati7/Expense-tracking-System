// "use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();


    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
    if (!mounted) {
        return null;
    }


    return (
        <label className="ui-switch">
            <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
            />
            <div className="slider">
                <div className="circle"></div>
            </div>
        </label>
    );
};
