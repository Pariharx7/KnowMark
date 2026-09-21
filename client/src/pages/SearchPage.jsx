import { SearchBookmarks, RecentBookmarks } from "@features/bookmark";
import { Bookmarks } from '@features/dashboard';
import { HiBookmark, HiBookmarkSquare, HiDocumentMagnifyingGlass, HiMagnifyingGlass, HiOutlineBookmark, HiOutlineSquares2X2 } from "react-icons/hi2";

const SearchPage = () => {
    return (
        <div className="mt-5 px-3 max-w-screen mx-4 flex items-center flex-col gap-4 mb-4">
            <div className="text-3xl tracking-wide">
                Search Your Bookmarks
            </div>
            <div className="py-7 w-full mx-auto border border-side p-2 rounded-xl flex flex-col gap-3 h-[30rem]">
                <SearchBookmarks />
                <div className="mx-9 flex flex-col justify-center items-center h-full">
                    <div className="flex items-center justify-center my-4">
                        <HiOutlineBookmark className="size-30" />
                    </div>
                    <p className="w-full text-center text-3xl">Your bookmarks will appear here</p>
                </div>
            </div>
            <div className="flex-1 py-7 w-full mx-auto border border-card p-2 rounded-xl flex flex-col gap-3">
                <p className="text-center text-2xl tracking-wider">
                    Recent Bookmarks
                </p>
                <div className=" w-full mx-auto border border-side p-2 rounded-xl flex flex-col gap-3">
                    <RecentBookmarks />
                </div>

            </div>
        </div>
    )
}

export default SearchPage;