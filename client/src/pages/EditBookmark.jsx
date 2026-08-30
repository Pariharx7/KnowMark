import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { BookmarkService, BookmarkForm, bookmarkUpdateSchema } from "@features/bookmark";

const EditBookmark = () => {
    const queryClient = useQueryClient();
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        data: bookmark,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["bookmark", id],
        queryFn: async () => {
            const response = await BookmarkService.getBookmarkById(id);
            return response.data.data;
        },
        enabled: !!id,
        staleTime: Infinity,
    });

    const handleBookmarkUpdate = async formData => {
        await BookmarkService.updateBookmark(formData, id);
        queryClient.invalidateQueries({ queryKey: ["bookmark", id] });
        navigate('/dashboard');
    };

    if (isLoading) {
        return <div className="flex text-3xl text-black">Loading bookmark...</div>;
    }

    if (isError) {
        return <div className="flex text-3xl text-red-600">Unable to load bookmark: {error?.message || 'Please try again.'}</div>;
    }

    return (
        <section className="flex flex-col px-3 py-2">
            <div className="text-center text-3xl">Update Bookmark</div>
            <BookmarkForm
                onSubmit={handleBookmarkUpdate}
                schema={bookmarkUpdateSchema}
                buttonLabel="Update Bookmark"
                initialValues={bookmark}
                enabled={false}
            />
        </section>
    )
}

export default EditBookmark;