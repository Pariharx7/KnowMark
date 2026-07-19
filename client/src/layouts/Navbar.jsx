import { useEffect, useState } from "react";
import { FaHamburger, FaBars, FaXing, FaPlus, FaUser } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom'
import { navLinks } from '@config/navigation'
import { Button, SearchResults } from '@components/ui'
import { SearchBookmarks } from "@features/bookmark"

const Navbar = () => {
    return (
        <div className="border-b border-neutral-200 dark:border-neutral-300">
            <MobileNavbar />
            <DesktopNavbar />
        </div>
    );
};

const MobileNavbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex justify-between px-4 py-2 xl:hidden">
            KnowMark
            <button onClick={() => setOpen(!open)}>
                <FaBars className="size-4 rotate-180" />
            </button>
            {
                open &&
                <div className="fixed inset-0 z-50 h-full w-full bg-white px-4 py-2">
                    <div className="flex justify-between">
                        KnowMark
                        <button onClick={() => setOpen(false)}
                            className="absolute top-2 right-2"
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

const DesktopNavbar = () => {
    const navigate = useNavigate();

    return (
        <div className="hidden py-1.5 mt-1 px-7 w-full gap-2 xl:block">
            <div className="flex items-center justify-end gap-4 w-full">
                <Button onClick={() => navigate("/create")} label="Add Bookmark" Icon={FaPlus} variant="tertiary" corners="full" />
                <Link to={"/profile"} className="border rounded-full px-2 py-1"><FaUser className="h-5 lg:h-6" /></Link>
            </div>
        </div>
    )
}

export default Navbar;