import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { updatePasswordSchema } from '../validators';

import { useCurrentUser } from '@features/users';
import { InputBox, PasswordBox, Button, FormSnackBar } from '@components/ui';
import { useSnackbarStore, useSubmitStore } from '@store';

const UpdatePasswordForm = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setError,
        reset,
    } = useForm({
        resolver: zodResolver(updatePasswordSchema),
        mode: 'onChange'
    });

    const showSnackbar = useSnackbarStore((state) => state.snackBarState)
    const setShowSnackbar = useSnackbarStore((state) => state.setSnackBarState)
    const setFormSubmission = useSubmitStore((state) => state.setFormSubmitState)

    const { data: currentUser } = useCurrentUser();

    const onSubmitHandler = async data => {
        try {
            if (currentUser?.email === 'guest@guest.com') {
                throw new Error(`Password update is not permitted for guest users.`)
            }

            setFormSubmission(true);
            await onSubmit(data);
            reset();
        } catch (error) {
            setShowSnackbar(false);

            let errorMessage = "An unexpected error occured. Please try again.";

            if (error.message) {
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
                    <PasswordBox
                        label={"Old Password"}
                        props={register('oldPassword')}
                        type="password"
                        placeholder=""
                        error={errors.oldPassword?.message}
                        id="oldPassword"
                    />
                    <PasswordBox
                        label={"New Password"}
                        props={register('newPassword')}
                        type="password"
                        placeholder=""
                        error={errors.newPassword?.message}
                        id="newPassword"
                    />
                    <PasswordBox
                        label={"Repeat New Password"}
                        props={register('confirmNewPassword')}
                        type="password"
                        placeholder=""
                        error={errors.confirmNewPassword?.message}
                        id="confirmNewPassword"
                    />

                    <div className='w-full sm:w-fit'>
                        <Button
                            label="Update Password"
                            onClick={() => setShowSnackbar(true)}
                            // isDisabled={!isValid}
                            fullWidth
                        />
                    </div>
                    {errors.message && (
                        <p className="mt-4 text-center text-sm font-medium leading-tight text-red-400">{errors.message.message}</p>
                    )}
                </div>
            </form>

            {showSnackbar && (
                <FormSnackBar
                    labels={{
                        loading: 'Updating Password...',
                        success: 'Password updated successfully'
                    }}
                />
            )}
        </>
    )
}

export default UpdatePasswordForm;