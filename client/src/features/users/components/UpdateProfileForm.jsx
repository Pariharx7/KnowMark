import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

import { updateProfileSchema } from '../validators';

import { useCurrentUser } from '@features/users';
import { InputBox, Button, FormSnackBar } from '@components/ui';
import { useSnackbarStore, useSubmitStore } from '@store';

const UpdateProfileForm = ({ onSubmit, selectedImage, setSelectedImage }) => {

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setError,
        reset,
    } = useForm({
        resolver: zodResolver(updateProfileSchema),
        mode: 'onChange'
    });

    const showSnackbar = useSnackbarStore((state) => state.snackBarState)
    const setShowSnackbar = useSnackbarStore((state) => state.setSnackBarState)
    const setFormSubmission = useSubmitStore((state) => state.setFormSubmitState)

    const { data: currentUser } = useCurrentUser();

    // console.log("Users ", currentUser)

    const onSubmitHandler = async data => {
        // accept image or name or both
        try {
            if (currentUser?.email === 'guest@guest.com') {
                throw new Error(`Any update is not permitted for guest users.`)
            }

            setFormSubmission(true);

            // prepare payload: if image is selected use FormData, otherwise plain object
            let payload;
            if (selectedImage) {
                payload = new FormData();
                payload.append('image', selectedImage);
                if (data.name) payload.append('name', data.name);
            } else {
                payload = {};
                if (data.name) payload.name = data.name;
            }

            await onSubmit(payload);
            reset();
            if (setSelectedImage) setSelectedImage(null);
        } catch (error) {
            setShowSnackbar(false);

            let errorMessage = "An unexpected error occured. Please try again.";

            if (error?.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            setError('message', {
                type: 'manual',
                message: errorMessage,
            });
        } finally {
            setTimeout(() => setFormSubmission(false), 500);
            setTimeout(() => setShowSnackbar(false), 2500);
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)} className='mt-6'>
                <div className="flex flex-col space-y-5">
                    <p className="text-center">Hello <span>{currentUser?.name}</span></p>
                    <InputBox
                        label="Name"
                        type="text"
                        placeholder=""
                        id="name"
                        error={errors.name?.message}
                        props={register('name')}
                    />
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="w-full sm:w-fit">
                            <Button
                                label="Update Profile"
                                type="submit"
                                onClick={() => setShowSnackbar(true)}
                                // isDisabled={isValid}
                                fullWidth
                            />
                        </div>
                    </div>

                    {errors.message && (
                        <p className="mt-4 text-center text-sm font-medium leading-tight text-red-400">
                            {errors.message.message}
                        </p>
                    )}
                </div>
            </form>
            {showSnackbar && (
                <FormSnackBar
                    labels={{
                        loading: 'Updating profile...',
                        success: 'Profile updated successfully',
                    }}
                />
            )}
        </>
    )
}

export default UpdateProfileForm;