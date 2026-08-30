import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import { CreateBookmarkForm, BookmarkService, BookmarkForm, bookmarkCreationSchema } from "@features/bookmark";

const CreateBookmark = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleBookmarkCreation = async formData => {
        console.log("data  ", formData)
        await BookmarkService.createBookmark(formData);
        // queryClient.setQueryData(['createBookmark'], true);

        navigate('/dashboard');
    };

    return (
        <section className="flex flex-col px-3 py-2">
            <div className="text-center text-3xl">Create a Bookmark</div>
            {/* <CreateBookmarkForm onSubmit={handleBookmarkCreation} /> */}
            <BookmarkForm onSubmit={handleBookmarkCreation} schema={bookmarkCreationSchema} enabled={true} buttonLabel="Create Bookmark" />
        </section>
    )
}

export default CreateBookmark;