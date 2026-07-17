import { Link } from "react-router-dom";
import { HiMiniTag } from 'react-icons/hi2';

const SearchResults = ({ query, setSearch }) => {


    return (
        <div className="absolute left-0 right-0 z-50 mt-2 mr-2 w-full max-h-80 overflow-hidden overflow-y-auto rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-950">
            {query.isFetching ? (
                <div className="p-3 text-sm text-neutral-500 dark:text-neutral-400">Searching...</div>
            ) : query.data?.bookmarks?.length > 0 ? (
                <div className="divide-y divide-neutral-400 dark:divide-neutral-700">
                    {query.data.bookmarks.slice(0, 7).map((bookmark) => (
                        <Link
                            key={bookmark.id}
                            to={`/bookmark/${bookmark.id}`}
                            className="block px-4 py-3 text-left text-sm text-black hover:bg-neutral-100 hover:scale-98 dark:text-neutral-200 dark:hover:bg-neutral-900"
                            onClick={() => setSearch("")}
                        >
                            <div className="font-medium flex flex-row mx-3 items-center">
                                <HiMiniTag className="size-6" />
                                <div className="ml-4">
                                    <div className="font-medium">{bookmark.title || bookmark.url}</div>
                                    <div className="truncate text-xs text-neutral-500 dark:text-neutral-400">{bookmark.url}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="p-3 text-sm text-neutral-500 dark:text-neutral-400">No results found</div>
            )}
        </div>
    )
}

export default SearchResults;