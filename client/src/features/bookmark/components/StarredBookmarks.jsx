import { BookmarkItem } from '@features/bookmark'
import { useBookmarks } from '@features/dashboard'
import { BookmarkService } from "@features/bookmark";
import { useState } from 'react';
import { BOOKMARK_QUERY_KEYS } from "@config/constants";
import { Pagination } from '@components';
import { HiMiniSquares2X2, HiMiniViewColumns } from 'react-icons/hi2';

const StarredBookmarks = () => {

    const [page, setPage] = useState(1);

    const [pageView, setPageView] = useState("column");


    const keyName = `'${BOOKMARK_QUERY_KEYS.getAllStarredBookmarks}', page`;

    const { data: {
        bookmarks,
        pagination
    }, isPending, refetch } = useBookmarks(
        keyName,
        BookmarkService.getAllStarredBookmarks(page),
        page
    );

    return (
        <section className={`flex flex-col ${pageView === "column" ? "mx-auto" : "mx-10"}`} >
            <div className="w-full hidden md:flex flex-row-reverse mx-auto px-2 gap-3">
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
                    bookmarks.map((bookmark, index) => (
                        <BookmarkItem
                            key={index}
                            data={bookmark}
                            variant="card"
                        />
                    ))
                }
            </div>
            <div className='flex mt-4 items-center justify-center p-4 gap-2'>
                <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.lastPage}
                    setPage={setPage}
                />
            </div>
        </section>
    )
}

export default StarredBookmarks;