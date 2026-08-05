import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { AuthService } from '@features/authentication';
import { Button, ErrorSnackBar } from '@components/ui';
import { useSnackbarStore } from '@store';

const GuestSignin = ({ label }) => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const showSnackbar = useSnackbarStore((state) => state.snackBarState);
    const setShowSnackbar = useSnackbarStore((state) => state.setSnackBarState)

    const handleGuestSignin = async () => {
        try {
            const formData = {
                email: 'guest@guest.com',
                password: 'Guest@x1',
            };

            await AuthService.signin(formData);
            queryClient.setQueryData(['authStatus', true]);

            navigate('/dashboard');
        } catch (error) {
            setShowSnackbar(true);

            let errorMsg = 'An unexpected error occured.';

            if (error?.response?.data?.message) {
                errorMsg = error.response.data.message;
            }
            console.log(errorMsg);
        } finally {
            setTimeout(() => setShowSnackbar(false), 2000);
        }
    };

    return (
        <>
            <Button
                onClick={handleGuestSignin}
                variant="secondary"
                label={label || "Sign in as Guest"}
                fullWidth
            />

            {
                showSnackbar && (
                    <ErrorSnackBar label="Sorry, guest sign-in is currently unavailable. Please try again later." />
                )
            }
        </>
    )
}

export default GuestSignin;