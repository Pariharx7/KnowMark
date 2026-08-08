import { useEffect, useState } from 'react';
import { useThemeStore } from "@store";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggler = () => {
    // const [theme, setTheme] = useRecoilState(themeState);
    // const { theme, setTheme } = useThemeStore();
    const [iconRotation, setIconRotation] = useState(0);

    const theme = useThemeStore((state) => state.theme);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    // useEffect(() => {
    //     document.documentElement.classList.toggle('dark', theme === 'dark');
    // }, [theme]);

    const handleThemeSwitch = () => {
        toggleTheme();
        console.log("togglesss theme is: ", theme)
        setIconRotation(prevRotation => prevRotation + 360);
    };

    const Icon = theme === 'light' ? FaSun : FaMoon;

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
                className="align-top transition-transform duration-500 lg:text-black"
            />
        </div>
    );
};

export default ThemeToggler;