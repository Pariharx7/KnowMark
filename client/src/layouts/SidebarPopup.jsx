import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { useThemeStore } from "@store";
import { AuthService } from "@features/authentication";
import { useCurrentUser } from "@features/users";
import { ThemeToggler } from '@components';
import { FaCog, FaSquarespace, FaSignOutAlt, FaThemeco, FaThemeisle, FaAffiliatetheme, FaLaptop, FaDeskpro, FaDesktop } from "react-icons/fa";

const Popup = ({ hidePopup }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data: currentUser, isError } = useCurrentUser();
    // console.log("ID ", currentUser?._id)
    const handleSignOut = async () => {
        try {
            await AuthService.signout();

            queryClient.clear();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const toggleTheme = useThemeStore((state) => state.toggleTheme);


    return (
        <div className="relative min-w-[14.5rem] rounded-md border border-gray-200 bg-popover p-1 font-light text-popover-foreground shadow-lg dark:border-dark-800 dark:shadow-2xl dark:shadow-primary/40 mb-3 overflow-visible">
            <div
                className="relative flex cursor-default select-none justify-center items-center rounded-none px-3 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground"
                tabIndex="-1"
                onClick={hidePopup}
            >
                <div className="flex flex-col justify-start truncate text-left text-sm">
                    <div className="text-xs text-gray-500 mx-auto w-full">Signed in as</div>
                    <div className="text-center">
                        <span className="block truncate">
                            {isError ? (
                                <span className="text-red-400">Email couldn&apos;t load</span>
                            ) : (
                                currentUser?.email
                            )}
                        </span>
                    </div>
                </div>
            </div>

            <div role="separator" className="-mx-1 my-1 h-px bg-muted"></div>

            <Link
                className="relative flex cursor-pointer select-none items-center space-x-2.5 rounded-sm px-3 py-1.5 font-montserrat text-sm font-normal outline-none transition-colors hover:bg-accent focus:text-accent-foreground"
                tabIndex="-1"
                to="/dashboard"
                onClick={hidePopup}
            >
                <FaSquarespace className="h-5 dark:filter" />
                <span>Dashboard</span>
            </Link>

            <Link
                className="relative flex cursor-pointer select-none items-center space-x-2.5 rounded-sm px-3 py-1.5 font-montserrat text-sm font-normal outline-none transition-colors hover:bg-accent focus:text-accent-foreground"
                tabIndex="-1"
                to="/profile"
                onClick={hidePopup}
            >
                <FaCog className="h-5 dark:filter" />
                <span>Settings</span>
            </Link>

            <div
                role="separator"
                aria-orientation="horizontal"
                className="-mx-1 my-1 hidden h-px bg-muted lg:flex"
            ></div>

            <div
                className="relative flex cursor-default select-none items-center justify-between space-x-2 rounded-sm px-3 py-1.5 font-montserrat text-sm font-normal outline-none transition-colors hover:bg-accent focus:text-accent-foreground"
                tabIndex="-1"
                onClick={() => setTimeout(hidePopup, 500)}
            >
                <div
                    className="flex items-center space-x-2.5 cursor-pointer"
                    onClick={() => {
                        toggleTheme();
                    }}>
                    <FaDesktop className="size-5 dark:filter" />
                    <span>Theme</span>
                </div>
                <ThemeToggler />
            </div>

            <div
                role="separator"
                aria-orientation="horizontal"
                className="-mx-1 my-1 hidden h-px bg-muted lg:flex"
            ></div>

            <button
                className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 font-montserrat text-sm font-normal outline-none transition-colors hover:bg-accent focus:text-accent-foreground"
                tabIndex="-1"
                onClick={() => {
                    hidePopup();
                    handleSignOut();
                }}
            >
                <span className="flex items-center space-x-2.5">
                    <FaSignOutAlt className="h-5 dark:filter" />
                    <span>Sign out</span>
                </span>
            </button>
        </div>
    );
}

export default Popup;