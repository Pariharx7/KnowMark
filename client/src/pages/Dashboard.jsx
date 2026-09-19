import { Suspense } from 'react';
import { Loader } from '@components';
import { Bookmarks } from '@features/dashboard'

const Dashboard = () => {

    return (
        <div className='w-full flex flex-col min-h-screen'>
            <div className="py-2 text-center my-4 text-5xl md:text-9xl font-extralight bg-linear-to-r from-violet-600 via-slate-600 to-red-600 text-transparent bg-clip-text">Welcome to <span className="font-mono underline bg-linear-to-r from-red-600 via-violet-600 text-transparent bg-clip-text">KnowMark</span> <br /> Your Personal Bookmark Manager </div>
            <Suspense fallback={<div className="flex flex-col items-center justify-center h-40"><Loader /></div>} >
                <Bookmarks />
            </Suspense>

        </div>
    )
}


export default Dashboard;