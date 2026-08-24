import { useEffect, useState } from "react";
import { SearchBox, SearchResults } from '@components/ui'

import { useDebounce } from '@hooks'
import { BookmarkService } from '@features/bookmark'
import { useQuery } from "@tanstack/react-query";


const SearchBookmarks = () => {


    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const query = useQuery({
        queryKey: ["bookmarks", debouncedSearch, page],
        queryFn: async () => {
            const response = await BookmarkService.searchBookmark(debouncedSearch, page);
            return response.data.data;
        },
        enabled: Boolean(debouncedSearch?.trim()),
        keepPreviousData: true,
    });

    const handleSearchChange = e => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch]);

    return (
        <div className="w-full px-5 mx-auto relative">
            <SearchBox
                type="search"
                placeholder="Search Your bookmarks"
                props={{ value: search, onChange: handleSearchChange }}
            />
            {
                debouncedSearch.trim() && <SearchResults query={query} setSearch={setSearch} />
            }
        </div>
    )
}

export default SearchBookmarks;