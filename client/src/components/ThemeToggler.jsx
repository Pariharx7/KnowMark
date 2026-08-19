import { useEffect, useState } from 'react';
import { useThemeStore } from "@store";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggler = () => {
    const [iconRotation, setIconRotation] = useState(0);

    const theme = useThemeStore((state) => state.theme);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    const handleThemeSwitch = () => {
        toggleTheme();
        setIconRotation(prevRotation => prevRotation + 360);
    };

    const Icon = theme === 'light' ? FaMoon : FaSun;

    return (
        <div className="mr-2 flex items-start justify-end hover:cursor-pointer max-lg:mr-5 max-lg:flex-1">
            <Icon

                width={27}
                height={27}
                onClick={handleThemeSwitch}
                style={{
                    transform: `rotate(${iconRotation}deg)`,
                    transition: 'transform 0.5s ease-in-out',
                }}
                className="align-top transition-transform duration-500 lg:text-black dark:invert"
            />
        </div>
    );
};

export default ThemeToggler;