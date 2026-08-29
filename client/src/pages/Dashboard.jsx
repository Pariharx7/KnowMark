import { Bookmarks } from '@features/dashboard'
import { Suspense } from 'react';

const Dashboard = () => {

    return (
        <div className='w-full flex flex-col'>
            <div className="py-2 text-center my-4 text-5xl md:text-9xl font-extralight bg-linear-to-r from-violet-600 via-slate-600 to-red-600 text-transparent bg-clip-text">Welcome to <span className="font-mono underline bg-linear-to-r from-red-600 via-violet-600 text-transparent bg-clip-text">KnowMark</span> <br /> Your Personal Bookmark Manager </div>
            <Suspense fallback={<div>Loading bookmarks</div>} >
                <Bookmarks />
            </Suspense>

        </div>
    )
}

export default Dashboard;