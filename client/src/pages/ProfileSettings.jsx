import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UserService, UpdateProfileForm, UpdatePassword, UpdateProfilePicture } from '@features/users';
import { useState } from 'react';
import { useCurrentUser } from '@features/users';

const ProfileSettings = () => {
    const queryClient = useQueryClient();

    const currentUserMutation = useMutation({
        mutationFn: UserService.updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        },
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const { data: currentUser } = useCurrentUser();

    const handleUploadImage = async () => {
        if (!selectedImage) return;
        if (currentUser?.email === 'guest@guest.com') return;

        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            await currentUserMutation.mutateAsync(formData);
            setSelectedImage(null);
        } catch (err) {
            // mutation will handle errors; keep image for retry
            console.error(err);
        }
    };

    return (
        <section className="px-2 pt-6 lg:p-6 my-2">
            <div className="flex w-full flex-col items-center space-x-2 lg:items-start lg:space-x-0">

                <h5 className="mt-1.5 scroll-m-20 font-montserrat text-lg font-normal text-gray-400">
                    Manage your profile details.
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 w-full">
                    <div>
                        <div className="mt-4 w-full xl:max-w-2xl md:mx-auto text-center md:text-left">
                            <h3 className="font-palanquin text-2xl font-medium tracking-tight dark:text-white">Profile Picture</h3>

                            <h5 className="mt-1.5 scroll-m-20 xl:max-w-2xl font-montserrat text-lg font-normal text-gray-400 mx-3">Update your avatar.</h5>
                            <UpdateProfilePicture selectedImage={selectedImage} setSelectedImage={setSelectedImage} onUpload={handleUploadImage} isUploading={currentUserMutation.isLoading} />

                            <h3 className="font-palanquin text-2xl font-medium tracking-tight dark:text-white">Name</h3>

                            <h5 className="mt-1.5 scroll-m-20 xl:max-w-2xl font-montserrat text-lg font-normal text-gray-400 mx-3">Update your Name.</h5>
                            <UpdateProfileForm onSubmit={currentUserMutation.mutateAsync} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
                        </div>
                    </div>
                    <div className="my-6">
                        <UpdatePassword />
                    </div>
                </div>

            </div>
        </section>
    );
}

export default ProfileSettings;