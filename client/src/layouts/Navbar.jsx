import { useEffect, useState } from "react";
import { FaHamburger, FaBars, FaXing, FaPlus, FaRegUser } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStatus } from "@hooks";
import { navLinks } from '@config/navigation'
import { ThemeToggler } from '@components';
import { Button, SearchResults } from '@components/ui'
import { SearchBookmarks } from "@features/bookmark"

const Navbar = ({ variant }) => {
    const { data: isAuthenticated } = useAuthStatus();
    return (
        <div className="shadow-header">
            {/* <div className="border-b border-neutral-200 dark:border-neutral-300"> */}
            <MobileNavbar variant={variant} authenticated={isAuthenticated} />
            <DesktopNavbar variant={variant} authenticated={isAuthenticated} />
        </div>
    );
};

const MobileNavbar = ({ variant = "primary", authenticated }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex justify-between px-4 py-2 xl:hidden">
            KnowMark
            {
                variant === "primary"
                    ?
                    <button
                        onClick={
                            setTimeout(() => {
                                () => setOpen(!open)
                            }, 1000)
                        }
                    >
                        <FaBars className="size-4 active:rotate-90" />
                    </button>
                    :
                    <button>
                        {
                            authenticated
                                ?
                                <FaRegUser className="size-4" onClick={() => navigate("/profile")} />
                                :
                                <FaRegUser className="size-4" onClick={() => navigate("/signin")} />
                        }
                    </button>
            }
            {
                open &&
                <div className="fixed inset-0 z-50 h-full w-full bg-main px-4 py-2">
                    <div className="flex justify-between">
                        KnowMark
                        <ThemeToggler />
                        <button onClick={() => setOpen(false)}
                            className=" ml-4 absolute top-2 right-2"
                        >
                            <FaXing />
                        </button>
                    </div>

                    <div className="my-10 flex flex-col gap-6">
                        <SearchBookmarks />
                        {
                            navLinks.map((item, index) => (
                                <div key={index + item.title}
                                    className="px-2"
                                >
                                    <Link to={item.href} className="text-2xl font-medium text-neutral-600 dark:text-neutral-400">{item.title}</Link>
                                </div>
                            ))}
                    </div>
                </div>
            }
        </div>
    )
}

const DesktopNavbar = ({ variant = "primary", authenticated }) => {
    const navigate = useNavigate();
    return (
        <div className="hidden py-1.5 mt-1 px-7 w-full gap-2 xl:block shadow-brand">
            {
                variant === "primary"
                    ?
                    <div className="flex items-center justify-end gap-4 w-full">
                        <Button onClick={() => navigate("/create")} label="Add Bookmark" Icon={FaPlus} variant="tertiary" corners="full" />
                        <Link to={"/profile"} className="border rounded-full px-2 py-1"><FaRegUser className="h-5 lg:h-6" /></Link>
                    </div>
                    :
                    <div className="flex items-center justify-between gap-4 w-full">
                        <p>KnowMark</p>
                        <button className="cursor-pointer">
                            {
                                authenticated
                                    ?
                                    <FaRegUser className="size-4 bg-main fg-main" onClick={() => navigate("/profile")} />
                                    :
                                    <FaRegUser className="size-4 bg-main fg-main" onClick={() => navigate("/signin")} />
                            }
                        </button>
                    </div>
            }
        </div>
    )
}

export default Navbar;