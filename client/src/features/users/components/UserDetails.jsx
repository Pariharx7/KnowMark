import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { HiOutlineAcademicCap, HiOutlinePencilAlt, HiPencil, HiPencilAlt, HiUser, HiUserAdd, HiUserCircle } from "react-icons/hi"

import { updateProfileSchema } from '../validators';

import { useCurrentUser } from '@features/users';
import { InputBox, Button } from '@components/ui';

const UserDetails = () => {

    const { data: currentUser } = useCurrentUser();


    return (
        <section className="w-full lg:max-w-screen p-1 lg:p-3 grid gap-2 md:grid-cols-2 flex-1">
            <div className="col-span-1 py-12 px-3 text-2xl w-full lg:max-w-2xl mx-auto flex flex-col rounded-xl justify-center items-center gap-3 border bg-card h-full">
                <div className='bg-main fg-main h-96 w-full rounded-2xl my-10 px-10 text-9xl text-yellow-100 mx-auto'>
                    <HiUserCircle className="size-99 mx-auto" />
                </div>

                <div className="-mt-9">Hey 👋 <span className="text-3xl">{currentUser?.name}</span></div>
                <hr className="h-px bg-neutral-300 border-0 w-full my-3" />
                <div className="text-slate-700 px-2 w-full text-2xl py-4 flex flex-col items-center gap-3" >
                    <p className="text-3xl font-semibold underline">Personal Information: </p>
                    <div>Username:<span className='ml-5' >{currentUser?.username}</span></div>
                    <div>Email:<span className='ml-5' >{currentUser?.email}</span></div>
                    <div>Joined on: <span className="ml-5">{currentUser?.createdAt?.slice(0, 7)}</span></div>
                </div>
                <hr className="h-px bg-neutral-300 border-0 w-full my-3" />
                <div className="flex md:justify-end w-full my-3">
                    <Link className="p-2 border bg-red-400 text-white w-full text-center rounded-lg cursor-pointer flex items-center justify-center gap-2 active:scale-98" to="/settings">
                        <HiOutlinePencilAlt />   Edit Profile
                    </Link>
                </div>
            </div>
            <div className="col-span-1 w-full bg-main fg-card h-full max-w-2xl rounded-xl mx-auto px-2 py-3 flex flex-col gap-2 text-slate-700">

                <div className='bg-card border h-64 md:h-full w-full rounded-2xl p-2 text-2xl py-4 flex flex-col items-center justify-evenly'>
                    <p className="text-3xl font-semibold underline">Bookmarks Information: </p>
                    <div>
                        <p>Bookmarks: <Link to="/dashboard">{currentUser?.totalBookmarks}</Link></p>
                        <p>StarredBookmarks: <Link to="/starred">{currentUser?.starredBookmarks?.length}</Link></p>

                    </div>
                </div>
                <div className='bg-card border h-64 md:h-full w-full rounded-2xl p-2 text-2xl py-4 flex flex-col items-center justify-evenly'>
                    <p className="text-3xl font-semibold underline">Account Information: </p>
                    <div>
                        <p>Sign up method: <span className="ml-2">{currentUser?.signInType}</span></p>
                        <p>Joined on: <span className="ml-5">{currentUser?.createdAt?.slice(0, 7)}</span></p>
                        <p>Last Updated at: <span className="ml-5">{currentUser?.updatedAt?.slice(0, 10)}</span></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserDetails;