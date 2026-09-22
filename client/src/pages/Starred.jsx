import { Suspense } from 'react';
import { Loader } from '@components';
import { StarredBookmarks } from '@features/bookmark'

const Starred = () => {

    return (
        <div className='w-full flex flex-col'>
            <div className="py-2 text-center my-4 text-5xl md:text-9xl font-extralight bg-linear-to-r from-violet-600 via-slate-600 to-red-600 text-transparent bg-clip-text">  Starred Bookmarks </div>
            <Suspense fallback={<Loader />}>
                <StarredBookmarks />
            </Suspense>
        </div>
    )
}

export default Starred;