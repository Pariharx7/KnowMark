import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UserService, UpdateProfileForm, UserDetails } from '@features/users';

const Profile = () => {
    const queryClient = useQueryClient();

    const currentUserMutation = useMutation({
        mutationFn: UserService.updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        },
    });

    return (
        <section className="px-2 pt-6 lg:p-6">
            <div className="flex w-full flex-col items-center space-x-2 lg:items-start lg:space-x-0 py-4">
                <h3 className="font-palanquin text-2xl my-3 font-medium tracking-tight dark:text-white">
                    My Details
                </h3>

                <h5 className="mt-1.5 scroll-m-20 my-2 font-montserrat text-lg font-normal text-gray-400">
                    Your profile details.
                </h5>

                <UserDetails />
            </div>
        </section>
    );
};

export default Profile;
