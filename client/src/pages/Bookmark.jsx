import { useNavigate, useParams } from "react-router-dom";
import { BookmarkItem } from "@features/bookmark";
import { useBookmarks } from "@features/dashboard";
import { BookmarkService } from "@features/bookmark";
import { BOOKMARK_QUERY_KEYS } from "@config/constants";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Bookmark = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const keyName = `'${BOOKMARK_QUERY_KEYS.getBookmark}', ${id}`

    const { data: {
        bookmark,
        isStarred
    } } = useBookmarks(
        keyName,
        BookmarkService.getBookmarkById(id)
    );

    const [starred, setStarred] = useState(isStarred);
    const [loadingId, setLoadingId] = useState(id);
    const [message, setMessage] = useState("");


    const handleClick = useCallback(async (id) => {
        setLoadingId(id);

        setStarred(prev => !prev);

        const service = starred
            ? BookmarkService.unstarBookmark(id)
            : BookmarkService.starBookmark(id);

        try {
            const response = await service;
            if (response.data.success) {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.log("star error  ", error)
        } finally {
            setLoadingId(null);
            refetch();
        }
    }, [starred, loadingId]);

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await await BookmarkService.deleteBookmark(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["deleteBookmark"], });

            navigate("/dashboard");
        }
    });

    const handleEdit = (id, bookmark) => {
        navigate(`/edit-bookmark/${id}`, { state: { bookmarkData: bookmark } });
    }

    return (
        <div className="bg-main fg-main">
            {/* <Suspense fallback={<div className="flex text-3xl text-black">Loading... </div>}> */}
            <div>
                <BookmarkItem
                    data={bookmark}
                    onStar={() => handleClick(id)}
                    onDelete={() => deleteMutation.mutate(id)}
                    onEdit={() => handleEdit(id, bookmark)}
                    disabled={deleteMutation.isPending}
                />
            </div>
            {/* </Suspense> */}

        </div>
    )
}

export default Bookmark;