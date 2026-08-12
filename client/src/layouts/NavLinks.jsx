import { NavLink } from 'react-router-dom';

const NavLinks = ({ label, Icon, link, onClick }) => {
    const active =
        'flex w-full items-center space-x-3 rounded-md border-transparent bg-primary/5 dark:bg-primary-400/20 px-4 py-2.5 text-sm font-medium text-primary-700 dark:text-white ring-transparent transition-colors duration-100';
    const inactive =
        'flex w-full items-center space-x-3 rounded-md border-transparent px-4 py-2.5 text-sm dark:text-gray-300 ring-transparent transition-colors duration-100 hover:bg-gray-50 dark:hover:bg-dark-800/40 dark:hover:text-black';

    return (
        <NavLink
            className={({ isActive }) => (isActive ? active : inactive)}
            to={link}
            onClick={() => setTimeout(onClick, 100)}
        >
            <
                Icon
                className="h-5 flex-none transition-colors dark:filter"
            />
            {label && <span className="truncate hover:text-clip">{label}</span>}
        </NavLink>
    );
};

export default NavLinks;
