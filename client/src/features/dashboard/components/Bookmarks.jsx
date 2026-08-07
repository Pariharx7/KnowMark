import { BookmarkItem } from '@features/bookmark'
import { useBookmarks } from '@features/dashboard'
import { BookmarkService } from "@features/bookmark";
import { Suspense, useCallback, useEffect, useState } from 'react';
import { BOOKMARK_QUERY_KEYS } from "@config/constants";
import { Pagination } from '@components';
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { HiBookmarkSquare, HiCodeBracketSquare, HiMiniSquares2X2, HiMiniViewColumns, HiOutlineViewColumns, HiSquare2Stack, HiSquares2X2, HiSquaresPlus, HiViewColumns } from 'react-icons/hi2';

const Bookmarks = () => {

    const [page, setPage] = useState(1);
    const [pageView, setPageView] = useState("column");

    const keyName = `'${BOOKMARK_QUERY_KEYS.getAllBookmarks}', {page}`;


    const { data: {
        bookmarks,
        pagination
    }, isPending, refetch } = useBookmarks(
        keyName,
        BookmarkService.getAllBookmarks(page),
        page,
    );

    if (isPending) {
        return (
            <div className="font-extrabold text-2xl text-black">
                meri awaaz
            </div>
        )
    }

    return (
        <section className={`flex flex-col ${pageView === "column" ? "mx-auto" : "mx-10"}`} >
            <div className={`w-full mx-auto px-2 gap-3 hidden md:flex flex-row-reverse`}>
                <button
                    onClick={() => setPageView("row")}
                >
                    <HiMiniViewColumns className="size-6 fill-blue-700 cursor-pointer" />
                </button>
                <button
                    onClick={() => setPageView("column")}
                >
                    <HiMiniSquares2X2 className="size-5 fill-blue-700 cursor-pointer" />
                </button>

            </div>
            <div
                className={` mx-2 flex-wrap grid grid-cols-1 gap-1 md:gap-3 xl:gap-7 ${pageView === "column" ? "md:grid-cols-2 xl:grid-cols-3" : "grid-rows-1 w-full"}`}
                key={page}>
                {
                    bookmarks?.map((bookmark, index) => (
                        // <Suspense key={page + index} fallback={<div className="text-2xl">Changing pages</div>}>
                        <BookmarkItem
                            key={index}
                            variant="card"
                            data={bookmark}
                        />
                        // </Suspense>
                    ))
                }
            </div>

            <div className='flex mt-4 items-center justify-center p-4 gap-2'>
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.lastPage}
                    setPage={setPage}
                    refetch={refetch}
                />
            </div>
        </section>
    )
}

export default Bookmarks;