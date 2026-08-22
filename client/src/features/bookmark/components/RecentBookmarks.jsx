import { BookmarkItem } from '@features/bookmark'
import { useBookmarks } from '@features/dashboard'
import { BookmarkService } from "@features/bookmark";
import { Suspense, useCallback, useEffect, useState } from 'react';
import { BOOKMARK_QUERY_KEYS } from "@config/constants";
import { Pagination } from '@components';
import { useQuery, keepPreviousData } from '@tanstack/react-query'


const RecentBookmarks = () => {
    const keyName = `'${BOOKMARK_QUERY_KEYS.getAllBookmarks}', {page, limit}`;

    const { data: {
        bookmarks } } = useBookmarks(
            keyName,
            BookmarkService.getAllBookmarks(1, 5),
            1, 5
        );

    return (
        <section className='flex flex-col md:flex-row gap-1'>
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
        </section>
    )
}

export default RecentBookmarks;