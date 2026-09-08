import { NavLink } from 'react-router-dom';
import { cn } from "@config/utils.js";

const NavLinks = ({ label, Icon, link, onClick }) => {
    const active =
        'flex w-full items-center space-x-3 rounded-md border-transparent bg-primary/5 dark:bg-primary-400/20 px-4 py-2.5 text-sm font-medium text-[var(--primary)] dark:text-white ring-transparent transition-colors duration-100 active:justify-center';
    const inactive =
        'flex w-full items-center space-x-3 rounded-md border-transparent px-4 py-2.5 text-sm ring-transparent transition-colors duration-100 hover:bg-gray-400 dark:hover:bg-gray-800/70 hover:justify-center';

    return (
        <NavLink
            className={({ isActive }) => (isActive ? active : inactive)}
            to={link}
            onClick={() => setTimeout(onClick, 100)}
        >
            <
                Icon
                className={cn(
                    "h-5 flex-none transition-colors dark:filter",
                    ({ isActive }) => (isActive ? active : inactive)
                )}
            />
            {label && <span className="truncate">{label}</span>}
        </NavLink>
    );
};

export default NavLinks;
